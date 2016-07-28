'use strict';

var gulp = require('gulp');
var ngConstant = require('gulp-ng-constant');
var path = require('path');
var conf = require('./conf');

gulp.task('constants', function () {
  return gulp.src('gulp/sails-host.json')
    .pipe(ngConstant({
      name: 'glaAngular.config',
      constants: {SAILS_HOST: (process.env.SAILS_HOST || 'gla_sails') + ':' + (process.env.SAILS_PORT || '1337')}
    }))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app')));
});
