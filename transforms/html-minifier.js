/**
 * Minifies HTML files including inline head scripts.
 */
const fs = require('fs')
const htmlmin = require('html-minifier')
const globby = require('globby')
module.exports = () => {
  const filePaths = globby.sync('./out/**/*.html')
  for (const path of filePaths) {
    const content = fs.readFileSync(path, 'utf-8')
    const minified = htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
    })
    fs.writeFileSync(path, minified, 'utf-8')
  }
}