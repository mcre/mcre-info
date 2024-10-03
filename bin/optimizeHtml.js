const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier-terser');

const distPath = path.resolve(__dirname, '../dist');
const files = fs.readdirSync(distPath).filter(file => file.endsWith('.html'));

async function processFiles() {
  for (const file of files) {
    const filePath = path.join(distPath, file);
    let html = fs.readFileSync(filePath, 'utf-8');

    html = html.replace(/<script\s+([^>]*type="module"[^>]*)><\/script>/g, (match, attrs) => {
      if (!attrs.includes('defer')) {
        return `<script ${attrs} defer></script>`;
      }
      return match;
    });

    const minifiedHtml = await minify(html, {
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true,
      collapseBooleanAttributes: true
    });

    fs.writeFileSync(filePath, minifiedHtml, 'utf-8');
  }
}

processFiles();
