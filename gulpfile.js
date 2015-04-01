var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var insert = require('gulp-insert');


gulp.task('default', function () {
    return gulp.src('lib/*.js')
        .pipe(babel())
        .pipe(concat('ignite.js'))
        .pipe(insert.prepend('#!/usr/bin/env node\n\n'))
        .pipe(gulp.dest('dist'))
});

