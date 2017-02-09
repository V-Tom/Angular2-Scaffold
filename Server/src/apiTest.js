'use strict'
const Crypto = require('./lib/crypto')
const spider = require('./lib/spider')
const fs = require('fs')

const headers = {
  'host': 'music.163.com',
  'Content-Type': 'application/x-www-form-urlencoded',
  'Cookie': 'usertrack=c+5+hleQovZy+B8GTL5eAg==; _ntes_nnid=53fa53e7747fcdca41b67a6efd045ff4,1469096695267; _ntes_nuid=53fa53e7747fcdca41b67a6efd045ff4; __gads=ID=669cc5b5b90a07b7:T=1472694115:S=ALNI_MZXHrkKafCT3EZyg3udJvKqvd_uBQ; vjuids=2755d7020.156e368e371.0.2c35a58913435; __utma=187553192.1942497291.1469096697.1476840551.1476840547.1; __utmz=187553192.1476840551.1.1.utmcsr=travel.163.com|utmccn=(referral)|utmcmd=referral|utmcct=/16/0906/10/C09AL62700067VF3.html; playerid=67209602; _ga=GA1.2.1942497291.1469096697; vjlast=1472694117.1483004429.11; ne_analysis_trace_id=1483004459332; vinfo_n_f_l_n3=cec0b5ba6ec2f0c0.1.3.1472694117261.1478579844142.1483005789354; s_n_f_l_n3=cec0b5ba6ec2f0c01480663072441; BUTTON-AB=landingbutton_c; MUSIC_U=5f6f9aa84e31575bfde8fb97aff13752e04a17c861e0cf1c329c587c8f7acddd386bfd08906b4c74da83e3eddfc0e08baf9e62a8590fd08a; __csrf=fe1264ff7bc2d9051c3e77bd1bb1fdab; __remember_me=true; __utma=94650624.1942497291.1469096697.1484125604.1484129032.22; __utmc=94650624; __utmz=94650624.1484038852.19.7.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; JSESSIONID-WYYY=oVEGsy3lcP3IC6u0l1b3qk7nFvS14T6x%2FGngSwrQ6GZSqbm0o5%5CjxdUDSDfWo8aGzsWxCsplzri0UepMVMyRc0pZI6xumsM%2FV7ktSeEDyz%2FVIzMNbIl7YtibwPc%2FBafQsGvlFpMuF24%2FjSbrtC%5Ca9aAcEoDHWP2ZZ0t%5Cz7asP8RR9Xji%3A1484136174571; _iuqxldmzr_=32',
  'origin': 'http://music.163.com',
  'Referer': 'http://music.163.com/'
}

/**
 * 通过 歌曲名字 进行 模糊搜索
 * @param name
 */
const searchByNameApi = 'music.163.com/weapi/search/suggest/web?csrf_token='
exports.searchByName = name =>
  spider.post(
    searchByNameApi,
    Crypto.aesRsaEncrypt(JSON.stringify({
      s: name,
      "limit": "8",
      csrf_token: ''
    })),
    { headers }
  )


/**
 * 获取歌曲详情
 * @param id
 */
const getSongDetailByIdApi = 'music.163.com/weapi/song/enhance/player/url?csrf_token='
exports.getSongDetailById = id =>
  spider.post(
    getSongDetailByIdApi,
    Crypto.aesRsaEncrypt(JSON.stringify({
      ids: [id], br: 128000
    })),
    { headers }
  )


/**
 * 通过 id 获取 歌曲  mv
 */
exports.getSongMvById = function *(id) {
  const API = 'music.163.com/mv'

  const $ = yield spider.get(
    `${API}?id=${id}`,
    null,
    {
      headers,
      use$: true
    }
  )

  let json = {}
  let embed = $('embed')
  if (embed.length != 0) {
    embed.attr('flashvars').split('&').forEach(x => {
      let i = x.indexOf('=')
      json[x.substring(0, i)] = x.substring(i + 1)
    })
  }

  return json
}

/**
 * mv 视频流
 */
exports.stream = function (url) {
  const writeStream = fs.createWriteStream('sss.mp4')
  spider.stream(url).pipe(writeStream)
}