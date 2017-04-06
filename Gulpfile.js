'use strict';

const gulp = require('gulp');
const config = require('config');

const forever = require('gulp-forever-monitor');
const sync = require('browser-sync').create();

/*
 * @description Watches for changes in Node files, restarts server on changes, and refreshes browser after changes
 */
gulp.task('server', () => {
  const options = {
    env: process.env,
    args: process.argv,
    watch: true,
    watchIgnorePatterns: [
      '.*',
      'node_modules/**',
      'public/**',
      'tests/**',
      'Gulpfile.js',
    ],
  };

  forever('index.js', options)
    .on('watch:restart', info => {
      // Mean to alert user
      console.log(`Server was restarted due to '${info.file}' to '${info.stat}'`); // eslint-disable-line no-console

      // Reload page
      setTimeout(() => {
        sync.reload();
      }, 500);
    })
    .on('exit', () => {
      // Mean to alert user
      console.log('Server was closed'); // eslint-disable-line no-console
    });
});

/*
 * @description Proxies server through BrowserSync for automatic reloading
 */
gulp.task('sync', ['server'], () => {
  sync.init({
    proxy: config.env.url,
  });
});
