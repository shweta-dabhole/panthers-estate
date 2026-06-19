import re
import urllib.request
import os
import glob

html_files = glob.glob('*.html')
urls = set()

# Find URLs in HTML files
for html_file in html_files:
    content = open(html_file, encoding='utf-8').read()
    found = re.findall(r'href="(https://framerusercontent.com/[^"]+\.mjs)"', content)
    urls.update(found)

# Find URLs in existing MJS files
mjs_files = glob.glob('*.mjs')
for mjs_file in mjs_files:
    content = open(mjs_file, encoding='utf-8').read()
    # sometimes it's from "some_file.mjs"
    found_local = re.findall(r'from\s*"([^"]+\.mjs)"', content)
    for fl in found_local:
        if fl.startswith("http"):
            urls.add(fl)
        else:
            urls.add("https://framerusercontent.com/sites/6QGoKLiokOc1jSwwfXAL9n/" + fl.split('/')[-1])

print(f"Total unique module URLs found: {len(urls)}")

for url in urls:
    filename = url.split('/')[-1]
    if not os.path.exists(filename):
        print(f"Downloading missing module: {filename}...")
        try:
            urllib.request.urlretrieve(url, filename)
        except Exception as e:
            print(f"Error downloading {filename}: {e}")

print("Done downloading all modules.")
