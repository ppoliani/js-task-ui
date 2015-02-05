var minifyCSS = require('gulp-minify-css'),
    concat  = require('gulp-concat'),
    sass = require('gulp-sass');

module.exports = function(gulp, config){
    gulp.task('cssmin:app', function(){
        return gulp.src(config.bundles.sass)
            .pipe(sass())
            .pipe(concat("app.min.css"))
            .pipe(minifyCSS({keepBreaks: true}))
            .pipe(gulp.dest(config.distDir));
    });
};