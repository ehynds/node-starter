'use strict';

function favicon (req, res, next) {
  if (req.url === '/favicon.ico') {
    res.writeHead(200, { 'Content-Type': 'image/x-icon' });
    res.end();
    return;
  }

  next();
}

module.exports = favicon;
