'use strict';
const Router = require('koa-router')
const errorHandler = require('koa-error')

/**
 * all controller
 */
const { apiSearchController }=require('../controllers')

module.exports = (app) => {

  /**
   * global catch server error format
   */
  if (appConfig.env === 'development') {
    app.use(errorHandler())
  } else {
    app.use(require('../middlewares/middlewares.form.error.handler.js')())
  }

  /**
   * index page render router
   * @type {Router}
   */
  const router = new Router()

  router.get('/*', function *() {
    this.body = "hello world"
  })

  /**
   * restful API server routers
   */
  const { appConfig:{ restfulAPI } } = global
  const api = new Router({ prefix: '/' + restfulAPI.apiPrefix + '/' + restfulAPI.apiVersion })

  api.get('/search/:name', apiSearchController.searchByName)
  api.get('/song/:id', apiSearchController.getSongDetailById)
  api.get('/mv/:id', apiSearchController.getMvById)
  api.post('/mv/stream/:id', apiSearchController.downloadMvStream)
  api.get('/mv/stream/:id', apiSearchController.getMvStreamById)

  /**
   * Apply all router server
   */
  app.use(api.routes())
  app.use(router.routes())

  /**
   * restful API format
   */
  api.use(require('../middlewares/middlewares.restfulAPI.response.js')())

  /**
   * 404
   */
  app.use(function *() {
    this.body = {
      status: 404,
      msg: 'sorry,API document does not found'
    }
  })

  /**
   * error
   */
  app.on('error', function (err, ctx) {
    console.error(err)
  });

}
