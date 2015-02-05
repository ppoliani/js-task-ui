var clean = require('gulp-clean');

module.exports = function(gulp, config){
    gulp.task('clean:dist', function () {
        return gulp.src([config.distDir + '/*'], {read: false})
            .pipe(clean({ force: true }));
    });
};