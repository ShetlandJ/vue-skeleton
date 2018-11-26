const express = require('express');
const router = new express.Router();
const path = require('path');

const ENV = process.env.NODE_ENV || 'development';

let ROOT = path.join(__dirname, '..');

// Set dev vars
if (ENV !== 'production') {
  ROOT = path.join(ROOT, 'dist');
}

router.use('/register', require('./components/signUp/signUpRoutes'));

router.get('/*', (req, res, next) => {
  if (/\/[^.]*$/.test(req.url)) {
    res.sendFile('index.html', { root: ROOT });
  } else {
    next();
  }
});

module.exports = router;