const fs = require('fs');
const path = require('path');

const replacements = [
    [/>Résidentiel</g, '>Residential<'],
    [/Résidentiel/g, 'Residential'],
    [/Tous les projets/g, 'All projects'],
    [/Nos réalisations/g, 'Our projects'],
    [/Architecture d'intérieur/g, 'Interior Architecture'],
    [/Conception architecturale/gi, 'Architectural Design'],
    [/Pilotage de chantier/g, 'Construction Management'],
    [/Menuiserie sur-mesure/g, 'Custom Carpentry'],
    [/Mobilier et décoration/g, 'Furniture and Decoration'],
    [/Intérieur singulier aux tons chaleureux pour une atmosphère cosy et intemporelle/g, 'Unique interior with warm tones for a cozy and timeless atmosphere'],
    [/Nous concevons des lieux uniques, pensés pour être vécus, et dessinés pour traverser le temps\./g, 'We design unique spaces, created to be lived in, and drawn to stand the test of time.'],
    [/Un espace habillé de bois, mêlant détails parisiens classiques, moulures et proportions, à un concept de café résolument américain\./g, 'A space dressed in wood, mixing classic Parisian details, moldings and proportions, with a resolutely American cafe concept.'],
    [/Décoration intérieure/g, 'Interior Decoration'],
    [/Design d'intérieur/g, 'Interior Design'],
    [/Menuiserie de luxe/g, 'Luxury Carpentry'],
    [/RESTAURANT MÉDITERRANÉEN, INSTITUTION DU QUARTIER/g, 'MEDITERRANEAN RESTAURANT, NEIGHBORHOOD INSTITUTION'],
    [/>Projets</g, '>Projects<'],
    [/>projets</g, '>projects<'],
    [/>Agence</g, '>Agency<'],
    [/>agence</g, '>agency<'],
];

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    for (const [regex, replacement] of replacements) {
        if (regex.test(content)) {
            content = content.replace(regex, replacement);
            changed = true;
        }
    }
    if (changed) {
        fs.writeFileSync(filePath, content);
        console.log('Translated:', filePath);
    }
}

function processDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.html') || fullPath.endsWith('.js')) {
            processFile(fullPath);
        }
    }
}

// Translate files
processFile('app/projects/htmlContent.js');
processFile('app/page.js');
processDirectory('public/mersi-scraped-site/www.mersi-architecture.com/projets');

console.log('Translation complete.');
