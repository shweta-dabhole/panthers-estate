import os
import re
import requests
from bs4 import BeautifulSoup
from pathlib import Path
from urllib.parse import urljoin, urlparse, urlunparse

BASE_URL = "https://realtora.framer.ai/"
OUTPUT_DIR = Path("realtora_framer")
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
}

visited_urls = set()
asset_urls = set()

CSS_URL_PATTERN = re.compile(r"url\(([^)]+)\)")
IMPORT_PATTERN = re.compile(r"@import\s+(?:url\()?['\"]?([^'\")]+)['\"]?\)?")


def get_local_path(url: str, base_url: str, output_dir: Path) -> Path:
    parsed = urlparse(url)
    if not parsed.netloc:
        parsed = urlparse(urljoin(base_url, url))
    domain = parsed.netloc.replace(':', '_')
    if parsed.path.endswith('/') or parsed.path == '':
        path = parsed.path + 'index.html'
    else:
        path = parsed.path
    if path.startswith('/'):
        path = path[1:]
    if parsed.netloc == urlparse(base_url).netloc:
        local = output_dir / path
    else:
        local = output_dir / domain / path
    return local


def normalize_url(url: str, base_url: str) -> str:
    if not url:
        return None
    url = url.strip().strip('"\'')
    if url.startswith('data:'):
        return None
    if url.startswith('//'):
        return 'https:' + url
    return urljoin(base_url, url)


def extract_urls_from_css(css: str, base_url: str):
    urls = set()
    for match in CSS_URL_PATTERN.findall(css):
        url = match.strip().strip('"\'')
        if url and not url.startswith('data:'):
            urls.add(normalize_url(url, base_url))
    for match in IMPORT_PATTERN.findall(css):
        url = match.strip().strip('"\'')
        if url:
            urls.add(normalize_url(url, base_url))
    return {u for u in urls if u}


def extract_urls_from_html(html: str, base_url: str):
    soup = BeautifulSoup(html, 'html.parser')
    urls = set()
    selectors = [
        ('script', 'src'),
        ('link', 'href'),
        ('img', 'src'),
        ('source', 'src'),
        ('video', 'src'),
        ('audio', 'src'),
        ('iframe', 'src'),
        ('embed', 'src'),
        ('object', 'data'),
    ]
    for tag, attr in selectors:
        for element in soup.find_all(tag):
            url = element.get(attr)
            if url:
                urls.add(normalize_url(url, base_url))
    for source in soup.find_all('source'):
        srcset = source.get('srcset')
        if srcset:
            for part in srcset.split(','):
                urls.add(normalize_url(part.split()[0], base_url))
    for img in soup.find_all('img'):
        srcset = img.get('srcset')
        if srcset:
            for part in srcset.split(','):
                urls.add(normalize_url(part.split()[0], base_url))
    for element in soup.select('[style]'):
        style_text = element.get('style')
        for match in CSS_URL_PATTERN.findall(style_text):
            url = match.strip().strip('"\'')
            urls.add(normalize_url(url, base_url))
    if soup.title:
        urls.add(BLANK := None)
    return {u for u in urls if u}


def save_content(url: str, output_dir: Path, base_url: str):
    if url in visited_urls:
        return
    visited_urls.add(url)
    try:
        response = requests.get(url, headers=HEADERS, timeout=25)
        response.raise_for_status()
    except Exception as exc:
        print(f"Failed to download {url}: {exc}")
        return
    local_path = get_local_path(url, base_url, output_dir)
    local_path.parent.mkdir(parents=True, exist_ok=True)
    mode = 'wb'
    content = response.content
    if local_path.suffix.lower() in ['.html', '.htm', '.css', '.js', '.json', '.txt', '.svg']:
        try:
            content = response.content
        except Exception:
            pass
    with open(local_path, mode) as f:
        f.write(content)
    print(f"Saved {url} -> {local_path}")
    if local_path.suffix.lower() in ['.html', '.htm']:
        new_urls = extract_urls_from_html(response.text, url)
        asset_urls.update(new_urls)
    elif local_path.suffix.lower() == '.css':
        new_urls = extract_urls_from_css(response.text, url)
        asset_urls.update(new_urls)


def build_site():
    OUTPUT_DIR.mkdir(exist_ok=True)
    print(f"Downloading base page: {BASE_URL}")
    try:
        response = requests.get(BASE_URL, headers=HEADERS, timeout=25)
        response.raise_for_status()
    except Exception as exc:
        print(f"Could not retrieve {BASE_URL}: {exc}")
        return
    index_file = OUTPUT_DIR / 'index.html'
    index_file.write_text(response.text, encoding='utf-8')
    print(f"Saved main page -> {index_file}")
    initial_urls = extract_urls_from_html(response.text, BASE_URL)
    asset_urls.update(initial_urls)
    if response.headers.get('content-type', '').startswith('text/css'):
        asset_urls.update(extract_urls_from_css(response.text, BASE_URL))

    while asset_urls:
        url = asset_urls.pop()
        if url in visited_urls:
            continue
        save_content(url, OUTPUT_DIR, BASE_URL)
    print("Scrape complete.")


if __name__ == '__main__':
    build_site()
