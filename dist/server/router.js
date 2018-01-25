// router.js
const express = require('express');
const path = require('path');

const ENV = process.env.NODE_ENV || 'development';

let ROOT = path.join(__dirname, '..');

// Set dev vars
if (ENV !== 'production') {
  ROOT = path.join(ROOT, 'dist');
}

module.exports = express.Router()
  .use((req, res, next) => {
    // log each request to the console
    if (ENV !== 'production') {
      console.log(req.method, req.url);
    }

    // continue doing what we were doing and go to the route
    next();
  })

  // acutall backend routes should go here
  .get('/error', (req, res, next) => {
    // here we cause an error in the pipeline so we see express-winston in action.
    next(new Error('This is an error and it should be logged to the console'));
  })

  // for SPA redirect all else to index (app routes)
  .get('/*', (req, res, next) => {
    if (/\/[^.]*$/.test(req.url)) {
      res.sendFile('index.html', { root: ROOT });
    } else {
      next();
    }
  })
;
