// server.js

const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');
// const options = require('./router.options.js');


const PORT = process.env.PORT || 5000;
const ROOT = path.join(__dirname, '.');

express()
  .use(history({ verbose: true })) // Use connect history api for SPA
  .use(express.static(ROOT)) // Serve static from current folder
  // .set('views', path.join(__dirname, 'views'))
  // .set('view engine', 'ejs')
  // .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
