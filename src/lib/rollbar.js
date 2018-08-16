'use strict';

const Rollbar = require('rollbar');
const config = require('../config');
const _ = require('lodash');

let rollbar;

if (config.rollbar.enabled) {
  rollbar = new Rollbar({
    accessToken: config.rollbar.token,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: config.env
  });
} else {
  rollbar = {
    error: _.noop,
    errorHandler: _.noop
  };
}
module.exports = rollbar;
