require('dotenv').config()

// Database

//Insert DB configuration here

// Debugger
require('./configs/debugger.config')

// App
const express = require('express')
const app = express()

// Configs
require('./configs/middleware.config')(app)
require('./configs/locals.config')(app)
require('./configs/passport.config')(app)

// Routes index

require('./routes')(app)

module.exports = app
