var gulp = require('gulp'),
    karma = require('karma').server;


module.exports = function(gulp, config) {
    gulp.task('test', function (done) {
        karma.start({
            configFile: '../karma.conf.js',
            singleRun: true
        }, done);
    });
}
