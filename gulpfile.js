'use strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify')
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');
const sourcemaps = require('gulp-sourcemaps')
const webpack = require('webpack-stream')

gulp.task('html', function() {
  return gulp.src('./src/index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./public'))
});

gulp.task('stylus', function() {
  gulp.src('./src/styles/master.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/assets/css'))
    .pipe(browserSync.reload({
      stream: true,
      once: true
    }))
})

gulp.task('babel', function() {
  return gulp.src('./src/js/app.js')
    .pipe(sourcemaps.init())
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./public/assets/js/'))
    .pipe(browserSync.reload({
      stream: true,
      once: true
    }))
})

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: './public',
      port: 3002
    }
  })
  gulp.watch('./src/**/*.html', ['html'])
  gulp.watch('./src/styles/**/*.styl', ['stylus'])
  gulp.watch('./src/js/**/*.js', ['babel'])
});

gulp.task('default', ['html', 'stylus', 'babel', 'server'])
gulp.task('default', ['html', 'stylus', 'babel'])
