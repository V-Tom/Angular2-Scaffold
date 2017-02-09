'use strict'
const api = require('../lib/api')
const stream = require('koa-stream')
const fs = require('fs')

/**
 * 通过 歌曲名字 进行 模糊搜索
 */
exports.searchByName = function *() {
  const { name } = this.params
  const result = yield api.searchByName(name)
  this.body = JSON.parse(result)
}

/**
 * 通过 歌曲 id 获取详情
 */
exports.getSongDetailById = function *() {
  const { id } = this.params
  const result = yield api.getSongDetailById(id)
  this.body = JSON.parse(result)
}

/**
 * 通过 id 获取 歌曲  mv
 */
exports.getMvById = function *() {
  const { id } = this.params
  this.body = yield api.getMvById(id)
}

/**
 * 下载 mv 放到 本地
 */
exports.downloadMvStream = function *() {
  const { id } = this.params

  function statsFile() {
    return new Promise((resolve, reject) => {
        fs.stat(`${api.getMVLocalPath()}/${id}.mp4`, (err, stats) => {
          resolve(stats)
        })
      }
    )
  }

  const stats = yield  statsFile()
  if (!stats || !stats.isFile()) {
    yield api.requestMvStreamById(id)
  }
  this.body = {}
}
/**
 * 通过 id 获取 歌曲  mv stream
 */
exports.getMvStreamById = function *() {
  const { id } = this.params

  this.APIDoNotFormat = true

  yield stream.file(this, `${id}.mp4`, {
    root: api.getMVLocalPath()
  })
}