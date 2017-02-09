'use strict';

const koa = require('koa')

/**
 * init all server global config
 */
require('./src/init')

/**
 * koa middleware
 */
const app = koa()
require('./src/config/koa')(app)

/**
 * koa Routes
 */
require('./src/config/route')(app)


/**
 * Start app
 */
app.listen(appConfig.port)

console.log(chalk.cyan(`♪ Server started, listening on port: ${appConfig.port} ...`))
console.log(chalk.green(`Environment: ${appConfig.env} ...`))

/**
 * Export
 */
module.exports = app