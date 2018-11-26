// server.js

const express = require('express');
const path = require('path');
const cluster = require('express-cluster');
const compression = require('compression');
const winston = require('winston');
const expressWinston = require('express-winston');
const helmet = require('helmet');
const fs = require('fs');
const favicon = require('serve-favicon');
const router = require('./router');
const mysql = require('mysql');
const config = require('../config/db');

const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5000;
const ROOT = path.join(__dirname, '..');
const LOGS = path.join(ROOT, 'logs');

let STATIC = path.join(ROOT, 'static');

console.log(config);


db = mysql.createConnection ({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.db
});

// config logs
const logCombined = [
  new winston.transports.File({
    filename: path.join(LOGS, 'combined.log'),
    tailable: true,
    zippedArchive: true,
    maxsize: 102400,
    maxFiles: 30,
    colorize: true,
  }),
];

const logErrors = [
  new winston.transports.File({
    filename: path.join(LOGS, 'errors.log'),
    tailable: true,
    zippedArchive: true,
    maxsize: 102400,
    maxFiles: 30,
    colorize: true,
  }),
];

const logDev = [
  new winston.transports.Console({
    json: true,
    colorize: true,
  }),
];

// Set development vars
if (ENV !== 'production') {
  STATIC = path.join(ROOT, 'dist', 'static');
  logCombined.join(logDev);
  logErrors.join(logDev);
}

// touch new folders
[LOGS].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
});

process.on('SIGINT', () => {
  setTimeout(() => {
    console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
    process.exit(130);
  }, 0);
});

process.on('SIGTERM', () => {
  setTimeout(() => {
    console.log('\nGracefully shutting down from SIGTERM');
    process.exit(134);
  }, 0);
});

// start a cluster of webservers
cluster((worker) => {
  express()
    // use gzip compression
    .use(compression())

    // security for express
    .use(helmet())

    // favicon
    .use(favicon(path.join(STATIC, 'favicon.ico')))

    // use winston for logging
    .use(expressWinston.logger({
      transports: logCombined,
    }))

    // use express routing
    .use('/', router)

    // serve static from ROOT folder
    .use('/static', express.static(STATIC))

    // winston error logger makes sense AFTER the router
    .use(expressWinston.errorLogger({
      transports: logErrors,
    }))

    // listen on the given port
    .listen(PORT, () => console.log(`Listening on ${PORT} - worker #${worker.id} ${ROOT} in ${ENV} mode`));
}, {
  verbose: true,
});
