var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    through2 = require('through2'),
    stylus = require('gulp-stylus'),
    nib = require('nib');

var paths = {
    source: {
        css: [ 'app/styles/**/*.styl' ],
        css_main: [ 'app/styles/index.styl' ],
        js: 'app/**/*.js',
        react_main: './app/main.js'
    },
    dest: {
        css: 'public/css/',
        js: 'public/js/'
    }
};

// === Basic Tasks ===
gulp.task('css', function() {
    return gulp.src(paths.source.css_main)
        .pipe(stylus({
            use: nib(),
            import: [ 'nib' ]
        }))
        .pipe(gulp.dest(paths.dest.css));
});
gulp.task('js', function() {
    return gulp.src(paths.source.react_main)
        .pipe(through2.obj(function(file, enc, next) {
            browserify(file.path, {debug: true})
                .transform(babelify)
                .bundle(function(err, res) {
                    if(err) {return next(err);}

                    file.contents = res;
                    next(null, file);
                });
        }))
        .on('error', function(error) {
            console.log(error.stack);
            this.emit('end');
        })
        .pipe(rename('app.js'))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dest.js));
});
gulp.task('watch', function() {
    gulp.watch(paths.source.css, ['css']);
    gulp.watch(paths.source.js, ['js']);
});

// === Multi Tasks ===
gulp.task('compile', ['css', 'js']);
gulp.task('default', ['compile', 'watch']);
