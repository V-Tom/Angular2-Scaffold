'use strict'
const http = require('http')
const querystring = require('querystring')

const request = require('request')
const cheerio = require('cheerio')

const spiders = {}
const methods = ['post', 'get']

function spider(method, url, data, options = {}) {
  let result = ''

  const position = url.indexOf('/')

  const host = url.substr(0, position)
  const path = url.substr(position, url.length)

  const headers = options.headers || {}
  const isUse$ = options.use$

  return new Promise((resolve, reject) => {

    const req = http.request({
      host,
      path,
      method: String(method).toUpperCase(),
      headers
    }, res => {
      if (res.statusCode !== 200) {
        reject(`status code is :${res.statusCode}`)
      }

      res.on('data', (chunk) => {
        result += chunk.toString()
      });

      res.on('end', () => {
        isUse$ ? resolve(cheerio.load(result)) : resolve(result)
      })

    })

    req.on('error', (e) => {
      reject(e.message)
    });

    data && req.write(querystring.stringify(data))
    req.end()
  })

}

methods.forEach(method => spiders[method] = (url, data, options) => spider(method, url, data, options))

spiders.stream = (url) => request(url)

module.exports = spiders
