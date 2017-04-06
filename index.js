'use strict';

const express = require('express');
const config = require('config');

const application = express();

application.get('/', (req, res) => {
  res.send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>Teams@IBM</title></head><body><h1>Welcome to Teams@IBM!</h1></body></html>');
});

/*
 * @description Runs the application if and only if this file is being run directly
 */
// Ignoring as there's no way to test listening
/* istanbul ignore next */
if (!module.parent) {
  application.listen(config.env.port, () => {
    // Mean to console.log out, so disabling
    console.log(`Server starting on ${config.env.url}`); // eslint-disable-line no-console
  });
}

module.exports = application;
