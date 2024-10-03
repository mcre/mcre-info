(async () => {
  const critical = await import('critical');
  const path = require('path');
  const fs = require('fs');

  const distPath = path.join(__dirname, '../dist');

  const htmlFiles = fs.readdirSync(distPath).filter(file => file.endsWith('.html'));

  for (const file of htmlFiles) {
    const fullFilePath = path.join(distPath, file);
    try {
      await critical.generate({
        base: distPath,
        src: fullFilePath,
        target: file,
        inline: true,
        extract: true,
        dimensions: [
          { height: 823, width: 412 },
          { height: 940, width: 1350 },
        ],
        ignore: {
          atrule: ['@font-face'],
        }
      });
      console.log(`Generated critical CSS for ${file}`);
    } catch (err) {
      console.error(`Error generating critical CSS for ${file}:`, err);
    }
  }
})();
