'use strict';

const defer = require('config/defer').deferConfig;

module.exports = {
  site: {
    name: 'Teams@IBM',
  },
  env: {
    port: process.env.PORT || 8080,
    host: process.env.URL || 'localhost',
    url: defer(config => {
      return `${config.env.host}:${config.env.port}`;
    }),
  },
};
