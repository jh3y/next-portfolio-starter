const fs = require('fs')
const globby = require('globby')
const sharp = require('sharp')
const jsdom = require('jsdom')
const LOGGER = require('pino')()
const CONFIG = require('../n3xt.config')
const { JSDOM } = jsdom

/**
 * Enhance any locally used images
 */

module.exports = () => {
  const filePaths = globby.sync('./out/**/*.html')
  for (const path of filePaths) {
    // Turn each file into jsdoc and find any locally hosted images
    const content = fs.readFileSync(path, 'utf-8')
    const {
      window: { document },
    } = new JSDOM(content)
    // Find any local images and generate the types and sizes defined if one doesn't exist.
    const internalImages = [...document.querySelectorAll('img[src^="/"]')]
    if (internalImages.length) {
      fs.mkdirSync(`${process.cwd()}/public/enhanced/images`, {
        recursive: true,
      })
      internalImages.forEach((IMG) => {
        // Enhance the image element using Sharp based on the sizing and return a new element.
        const SRC = IMG.getAttribute('src')
        const SIZES = IMG.parentNode.getAttribute('data-sizes').split(',')
        const INPUT = `${process.cwd()}/public${SRC}`
        const INSTANCE = sharp(INPUT)
        for (const TYPE of CONFIG.images.types) {
          for (const SIZE of SIZES) {
            const DIMENSION = parseInt(SIZE.replace(/\([^)]*\)\s?/gm, ''), 10)
            const OUTPUT_PATH = `${process.cwd()}/public/enhanced${SRC.substring(
              0,
              SRC.lastIndexOf('.')
            )}_${DIMENSION}.${TYPE}`
            if (!fs.existsSync(OUTPUT_PATH)) {
              const CLONE = INSTANCE.clone()
              CLONE.resize(parseInt(DIMENSION, 10))[TYPE]().toFile(OUTPUT_PATH)
              LOGGER.info(`Enhancement: ${OUTPUT_PATH}`)
            }
          }
        }
      })
    }
  }
}
