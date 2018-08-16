'use strict';

const config = require('../config');
const logger = require('../lib/logger')(module);

function createApiHandlers (req, res) {
  function send (status, data) {
    if (typeof data === 'string') {
      data = {
        result: data
      };
    }
    if (!res.headersSent) {
      return res.status(status).json(data);
    }
    res.status(status);
    if (data) {
      return res.end(JSON.stringify(data));
    }
    res.send();
  }

  function error (err) {
    const data = {
      message: 'Error'
    };
    if (typeof err === 'string') {
      err = new Error(err);
    }
    if (config.env !== 'production') {
      data.name = err.name;
      data.message = err.message;
      data.stack = err.stack;
    }
    logger.error(err);
    send(500, data);
  }

  function success (data) {
    send(200, data || 'success');
  }

  function notFound (data) {
    send(404, data || 'not found');
  }

  function badRequest (data) {
    send(400, data || 'bad request');
  }

  function unauthorized () {
    send(401);
  }

  function noContent () {
    send(204);
  }

  return {
    error,
    success,
    noContent,
    badRequest,
    notFound,
    unauthorized
  };
}

function addHandlers (req, res, next) {
  res.api = createApiHandlers(req, res);
  next();
}

module.exports = addHandlers;
