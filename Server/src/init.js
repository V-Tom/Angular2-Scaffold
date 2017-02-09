'use strict';
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const config = require('./config')

/**
 * set global
 * @type {Chalk}
 */

global.chalk = chalk

global.appConfig = config.app

process.env.NODE_ENV = appConfig.env