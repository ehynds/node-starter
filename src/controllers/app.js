'use strict';

const logger = require('../lib/logger')(module);
const rollbar = require('../lib/rollbar');
const config = require('../config');

function home (req, res) {
  res.render('home');
}

function healthcheck (req, res) {
  // do something here - hit mongo, whatever
  res.api.success();
}

function err404 (req, res) {
  res.api.notFound();
}

/* eslint no-unused-vars: off */
function err500 (err, req, res, next) {
  res.api.error(err);

  if (config.rollbar.enabled) {
    rollbar.error(err, req);
  }
}

module.exports = {
  home,
  healthcheck,
  err404,
  err500
};
