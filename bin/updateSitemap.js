const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

const envFile =
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
dotenv.config({ path: path.resolve(__dirname, `../${envFile}`) })

const domain = `https://${process.env.VITE_DISTRIBUTION_DOMAIN_NAME}`

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${domain}/</loc>
  </url>
</urlset>`

const sitemapOutputPath = path.resolve(__dirname, '../public/sitemap.xml')
fs.writeFileSync(sitemapOutputPath, sitemap)

const robotsTxt = `User-agent: *
Disallow:

Sitemap: ${domain}/sitemap.xml`

const robotsTxtOutputPath = path.resolve(__dirname, '../public/robots.txt')
fs.writeFileSync(robotsTxtOutputPath, robotsTxt)
