import fs from 'fs';
import path from 'path';
import ClientProjectPage from './ClientProjectPage';

export default async function ProjectSlugPage({ params }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'public', 'mersi-scraped-site', 'www.mersi-architecture.com', 'projects', slug, 'index.html');
  
  try {
    const htmlContent = fs.readFileSync(filePath, 'utf8');
    
    // Extract body content
    const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    const bodyInnerHtml = bodyMatch ? bodyMatch[1] : '';

    // Extract data-wf-page attribute
    const pageMatch = htmlContent.match(/data-wf-page="([^"]+)"/);
    const dataWfPage = pageMatch ? pageMatch[1] : '';

    // Fix links to point to the Next.js routes
    const fixedBodyHtml = bodyInnerHtml.replace(/href="\/projets\//g, 'href="/projects/');

    return <ClientProjectPage htmlContent={fixedBodyHtml} dataWfPage={dataWfPage} />;
  } catch (error) {
    console.error("Error reading project file", error);
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-black text-white">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <p className="text-xl">The project "{slug}" could not be loaded.</p>
        <a href="/projects" className="mt-8 px-6 py-3 border border-white rounded hover:bg-white hover:text-black transition-colors">
          Back to Projects
        </a>
      </div>
    );
  }
}

export function generateStaticParams() {
  const projetsDir = path.join(process.cwd(), 'public', 'mersi-scraped-site', 'www.mersi-architecture.com', 'projects');
  try {
    const dirs = fs.readdirSync(projetsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => ({
        slug: dirent.name
      }));
    return dirs;
  } catch (err) {
    return [];
  }
}

// force reload 1781262218621
// reload 1781262345512
// reload 1781262590175
// reload 1781262806593
// reload 1781262961133
// reload 1781263032623
// reload 1781263191650