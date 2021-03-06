'use strict';

var http2 = require('http2')
	, express = require('express')
	, fs = require('fs')
	, spdy = require('spdy');

var options = {
  key: fs.readFileSync('./site/localhost.key'),
  cert: fs.readFileSync('./site/localhost.crt'),

  // TLS/SSL Certificate Passphrase
  passphrase: process.env.CERT_PASSPHRASE || 'asdf'
};


/**
 * Main application file
 */

// Default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Application Config
var config = require('./lib/config/config');

var app = express();

// Express settings
require('./lib/config/express')(app);

// Routing
require('./lib/routes')(app);

// Start server
/*
app.listen(config.port, function () {
  console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});
*/

spdy.createServer(options, app).listen(config.port, function () {
  console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
