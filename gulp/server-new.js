// 'use strict';
//
// var gulp = require('gulp');
// var util = require('util');
// var connect = require('gulp-connect');
// var conf = require('./conf');
// var path = require('path');
//
// function createServerTask(root) {
//   connect.server({
//     root: root,
//     port: 3000,
//     debug: true,
//     livereload: true,
//     middleware: function (connect, opt) {
//       return [['/bower_components',
//         connect["static"]('./bower_components')]]
//     }
//   });
// }
//
// gulp.task('serve', ['watch'], function () {
//   createServerTask([path.join(conf.paths.tmp, '/serve'), conf.paths.src, './'])
// });
//
// gulp.task('serve:dist', ['build'], function () {
//   createServerTask([conf.paths.dist])
// });
// //
// // gulp.task('serve:e2e', ['inject'], function () {
// //   createServerTask([conf.paths.dist])
// // });
// //
// // createServerTask('serve:e2e', ['inject'], [options.tmp + '/serve', options.src, './']);
// //
// // createServerTask('serve', ['watch'], [options.tmp + '/serve', options.src, './']);
// //
// // createServerTask('serve:e2e-dist', ['build'], [options.dist]);
