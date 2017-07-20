/*global console, res, req, require, module,  __dirname*/
/*jshint node:true*/
'use strict';

process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';
if (process.env.NODE_ENV == 'production') { 
  console.log("Production Mode"); 
} else if (process.env.NODE_ENV == 'development') {
  console.log("Development Mode"); 
}

var orientDB = require('orientjs');

var server = orientDB({
  host: 'localhost',
  port: 2424,
  username: 'root',
  password: 'ilvmad99'
});

