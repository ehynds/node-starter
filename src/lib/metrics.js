'use strict';

const config = require('../config');
const logger = require('./logger')(module);
const StatsD = require('node-statsd');
const os = require('os');

const prefix = 'api.express.http';

const client = new StatsD({
  prefix: `${config.metrics.prefix}.`,
  mock: !config.metrics.enabled,
  global_tags: [
    `env:${config.env}`,
    `host:${os.hostname().split('.')[0]}`
  ]
});

client.socket.on('error', (error) => {
  return logger.error(`Error in StatsD socket: ${error}`);
});

function middleware (req, res, next) {
  if (!config.metrics.enabled) {
    return next();
  }

  const start = process.hrtime();
  const oldEnd = res.end;

  res.end = (chunk, encoding) => {
    res.end = oldEnd;
    res.end(chunk, encoding);
    client.timing(`${prefix}.response_time`, (process.hrtime(start)[1] / 1000000));
    client.increment(`${prefix}.count`, 1);
    client.increment(`${prefix}.status_code.${res.statusCode}`, 1);
    client.increment(`${prefix}.status_code.all`, 1);
  };

  next();
}

module.exports = client;
module.exports.middleware = middleware;
