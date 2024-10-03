const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier-terser');

const distPath = path.resolve(__dirname, '../dist');
const files = fs.readdirSync(distPath).filter(file => file.endsWith('.html'));

async function processFiles() {
  for (const file of files) {
    const filePath = path.join(distPath, file);
    let html = fs.readFileSync(filePath, 'utf-8');

    let vueScript = '';
    html = html.replace(/<script\s+([^>]*type="module"[^>]*)><\/script>/g, (match, attrs) => {
      if (attrs.includes('src="')) {
        const srcMatch = attrs.match(/src="([^"]+)"/);
        if (srcMatch) {
          vueScript = srcMatch[1];
        }
      }
      return '';
    });

    // スクロールするまでjsをロードしない
    const scrollLoadScript = `
    <script>
      document.addEventListener('DOMContentLoaded', function () {
        let hasLoaded = false;

        function loadVueBundle() {
          if (!hasLoaded) {
            const script = document.createElement('script');
            script.src = '${vueScript}';
            script.defer = true;
            document.body.appendChild(script);
            hasLoaded = true;
            window.removeEventListener('scroll', onScroll);
          }
        }

        function onScroll() {
          loadVueBundle();
        }

        window.addEventListener('scroll', onScroll, { once: true });
      });
    </script>
    `;
    html = html.replace('</body>', `${scrollLoadScript}</body>`);

    // HTMLの最適化（minify）
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
