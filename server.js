// server.js

// import http from 'http';
// import express from 'express';

// const path = require('path');
// const serveStatic = require('serve-static');

// const app = express();
// app.use(serveStatic(path.join(__dirname, '/dist')));

// const port = process.env.PORT || 5000;
// app.listen(port);

// console.log(`server started ${port}`);

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
//const serveStatic = require('serve-static')

express()
  .use(express.static(path.join(__dirname, 'dist')))
  //.set('views', path.join(__dirname, 'views'))
  //.set('view engine', 'ejs')
  //.get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
