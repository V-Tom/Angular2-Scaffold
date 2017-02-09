'use strict'

module.exports = {
  app: {
    env: 'development',
    port: 9999,
    restfulAPI: {
      apiPrefix: 'api',
      apiVersion: 'v1'
    }
  },
  koa: require('./koa'),
  route: require('./route')
}