var webpack = require('gulp-webpack'),
    replace = require('gulp-replace-task'),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglify');

// config
var webpackOptions = {

    output: {
        filename: 'app.js'
    },

    externals: {
        'angular': 'angular'
    },

    devtool: '#source-map'
};

var replacePatterns = [{
        match: 'VERSION',
        replacement: new Date()
    }
];

module.exports = function(gulp, config){
    gulp.task('scripts:dev', function(){
        return gulp.src(config.appDir + '/core/app.js')
            .pipe(webpack(webpackOptions))
            .pipe(replace({ patterns: replacePatterns }))
            .pipe(gulp.dest(config.distDir + '/'));
    });

    gulp.task('concat:dev', function(){
        return gulp.src(config.bundles.js.vendor)
            .pipe(concat('vendor.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(config.distDir + '/'));
    });
};