const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier-terser');

const distPath = path.resolve(__dirname, '../dist');
const files = fs.readdirSync(distPath).filter(file => file.endsWith('.html'));

async function processFiles() {
  for (const file of files) {
    const filePath = path.join(distPath, file);
    let html = fs.readFileSync(filePath, 'utf-8');

    // <script>タグを最下部に移動
    let scripts = '';
    html = html.replace(/<script\s+([^>]*type="module"[^>]*)><\/script>/g, (match, attrs) => {
      scripts += `<script ${attrs}></script>\n`;
      return '';
    });

    html = html.replace('</body>', `${scripts}</body>`);

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
