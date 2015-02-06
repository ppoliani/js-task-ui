var gulp    = require('gulp'),
    glob    = require('glob'),
    config  = require('./gulp/config'),
    karma   = require('karma').server,
    nodemon = require('gulp-nodemon');

var BUILD_TASKS_PATH = './gulp/build_tasks/';

// load all build tasks
glob.sync('*', {cwd: BUILD_TASKS_PATH}).forEach(function(option) { require(BUILD_TASKS_PATH + option)(gulp, config); });


// Custom Tasks

gulp.task('dev', function(){
    gulp.start('dev:watch', 'watch');
});

gulp.task('dev:watch', function(){
    gulp.start('clean:dist', 'scripts:dev', 'concat:dev', 'cssmin:app');
});


gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/gulp/karma.conf.js',
        singleRun: false
    }, function(){
        done();
    });
});

gulp.task('server', function () {
  nodemon({ script: 'server.js', ext: 'html js' })
    .on('restart', function () {
      console.log('restarted!')
    })
});

gulp.task('watch', function(){
    gulp.watch(config.appDir + '/**/*.js', ['dev']);
});

gulp.task('start', function(){
    gulp.start('dev:watch', 'test', 'server');
});