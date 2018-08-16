'use strict';

Error.stackTraceLimit = 30;

const config = require('./config');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const expressWinston = require('express-winston');
const path = require('path');
const compression = require('compression');
const logger = require('./lib/logger')(module);
const metrics = require('./lib/metrics');
const routes = require('./routes');
const middleware = require('./middleware');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('port', config.port);
app.enable('trust proxy');
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// Enable http request logging
app.use(expressWinston.logger({
  winstonInstance: logger,
  meta: false,
  colorStatus: true,
  msg: 'HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms - {{req.url}}',
  level: 'http'
}));

app.use(express.static(path.join(__dirname, 'public')));

if (config.env === 'development') {
  app.use(middleware.favicon);
}

app.use(middleware.http);
app.use(metrics.middleware);
app.use(routes);

module.exports = app;
