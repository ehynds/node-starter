'use strict';

const winston = require('winston');
const config = require('../config');

function getLabel (callingModule) {
  const parts = callingModule.filename.split('/');
  let index = parts.length - 1;
  while (index > 0 && ![config.appDir].includes(parts[index])) {
    index -= 1;
  }
  const filename = parts.slice(index + 1).join('/');
  return `${filename}, env: ${config.env}`;
}

module.exports = (callingModule) => {
  return new winston.Logger({
    transports: [
      new (winston.transports.Console)({
        colorize: true,
        prettyPrint: true,
        timestamp: () => {
          const now = new Date();
          const date = now.toLocaleDateString();
          const time = now.toLocaleTimeString();
          return `${date} ${time}`;
        },
        json: false,
        level: config.logger.level,
        label: getLabel(callingModule),
        stderrLevels: ['warn', 'error']
      })
    ],
    levels: {
      http: 4,
      debug: 3,
      info: 2,
      warn: 1,
      error: 0
    },
    colors: {
      http: 'cyan',
      debug: 'magenta',
      info: 'green',
      warn: 'yellow',
      error: 'red'
    }
  });
};
