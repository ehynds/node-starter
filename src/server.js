'use strict';

const gracefulShutdown = require('http-graceful-shutdown');
const app = require('./app');
const logger = require('./lib/logger')(module);

const server = app.listen(app.get('port'), () => {
  logger.info(`Express server listening on port ${app.get('port')}. Env: ${app.get('env')}`);
});

gracefulShutdown(server, {
  signals: 'SIGINT SIGTERM',
  timeout: 30000,
  development: false,
  onShutdown: () => {
    // Custom cleanup stuff here.
    return Promise.resolve();
  },
  finally: () => {
    logger.info('Server gracefully shut down');
  }
});
