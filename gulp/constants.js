'use strict';

var gulp = require('gulp');
var ngConstant = require('gulp-ng-constant');
var path = require('path');
var conf = require('./conf');

gulp.task('constants', function () {
  // var sailsIp = dnsSync.resolve('glasails'); // Internal IP doesn't work from the browser...
  return gulp.src('gulp/sails-host.json')
    .pipe(ngConstant({
      name: 'glaAngular.config',
      constants: {
        SAILS_HOST: process.env.SAILS_HOST || null,
        SAILS_PORT: (process.env.SAILS_PORT || '1337')
      }
    }))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app')));
});




