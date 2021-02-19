const chokidar = require('chokidar')
const logger = require('pino')()
const fs = require('fs')
// Set up Netlify CMS Config Watching
logger.info('Setting up Netlify CMS config watch')
chokidar.watch(`${process.cwd()}/admin/config.yml`).on('change', () => {
  logger.info('Updating Netlify CMS Config')
  const CONFIG = fs.readFileSync('./admin/config.yml', 'utf-8')
  fs.writeFileSync(
    `${process.cwd()}/public/config.yml`,
    `local_backend: true\n${CONFIG}`,
    'utf-8'
  )
})
