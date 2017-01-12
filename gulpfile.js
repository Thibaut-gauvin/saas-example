'use strict';

/**
 * Libs & Plugin
 */
var gulp        = require('gulp');
var sass        = require('gulp-sass');
var changed     = require('gulp-changed');

/**
 * Variable used in recipes
 */
var config = {
    bowerDir: './bower_components',
    sassSrc: 'assets/sass/**/*.scss',
    sassDest: './dist/css',
    sassOutputStyle: 'compressed',
    jsSrc: 'assets/js/**/*.js',
    jsDest: './dist/js'
};

gulp.task( 'default',
    [ 'build']
);

gulp.task( 'build',
    [ 'css', 'js' ]
);

gulp.task( 'dist',
    [ 'build' ]
);

/**
 * Compile Sass to css
 */
gulp.task( 'css', function() {
    gulp.src([
        config.sassSrc
    ])
    .pipe(
        sass({
            outputStyle: config.sassOutputStyle
        }).on('error', sass.logError)
    )
    .pipe(gulp.dest(config.sassDest));
});

/**
 * Dump Javascript from 'assets/js' TO 'dist/js' folder
 */
gulp.task( 'js', function() {
    gulp.src(
        [
            config.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.min.js',
            config.bowerDir + '/jquery/dist/jquery.min.js',
            config.jsSrc
        ])
        .pipe(changed(config.jsDest))
        .pipe(gulp.dest(config.jsDest));
});

/**
 * Watch for change
 *   - Recompile Sass
 *   - Dump Js
 */
gulp.task('watch', function () {
    gulp.watch(config.sassSrc, ['css']);
    gulp.watch(config.jsSrc, ['js']);
});
