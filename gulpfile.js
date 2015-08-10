'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var reactify = require('reactify');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var sass = require('gulp-sass');

// add custom browserify options here
var customOpts = {
  js: {
    entries: ['./www/assets/js/main.js'],
    inputs: ['./www/assets/js/**/*.js', './www/assets/js/**/*.jsx'],
    output: 'bundle.js',
  },
  sass: {
    entries: ['./www/assets/sass/main.scss'],
    inputs: ['./www/assets/sass/**/*.scss'],
    output: 'main.css'
  },
  outputDir: './www/build/',
  debug: true
};

var opts = assign({}, watchify.args, {
  entries: customOpts.js.entries,
  debug: true,
});

var b = watchify(browserify(opts));
// add transformations here
// i.e. b.transform(coffeeify);
b.transform(reactify);

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(customOpts.js.output))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    // .pipe(sourcemaps.init({loadMaps: false})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    // .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest(customOpts.outputDir));
}

gulp.task('sass', function () {
  gulp.src(customOpts.sass.entries)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(customOpts.outputDir));
});

gulp.task('watch', function() {
  gulp.watch(customOpts.js.inputs, ['js']);
  gulp.watch(customOpts.sass.inputs, ['sass']);
});
