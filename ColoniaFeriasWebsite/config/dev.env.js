'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ROOT_API: '"http://api.colonia.ferias/"'
  // ROOT_API: '"http://colonia.voltzparkour.com.br/api/"'
})
