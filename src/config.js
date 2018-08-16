'use strict';

const env = process.env;
const nodeEnv = env.NODE_ENV || 'development';
const _ = require('lodash');

env.NODE_ENV = nodeEnv;

const config = {
  env: nodeEnv,

  port: env.PORT || 8080,

  // TODO get this from the path module.
  // used to assist the logger in figuring out the filename
  appDir: 'mycoolproject',

  logger: {
    level: 'debug'
  },

  metrics: {
    enabled: false,
    prefix: 'mycoolapp'
  },

  rollbar: {
    enabled: false
  }
};

// Place env-specific overrides here
const environments = {
  development: {
    logger: {
      level: 'http'
    }
  },

  test: {
  },

  staging: {
    metrics: {
      enabled: true
    },

    rollbar: {
      enabled: true,
      token: ''
    }
  },

  production: {
    metrics: {
      enabled: true
    },

    rollbar: {
      enabled: true,
      token: ''
    }
  }
};

module.exports = _.merge(config, environments[nodeEnv]);
