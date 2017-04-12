gulp = require('gulp');
browserSync = require('browser-sync');

gulp.task('dist',()=>{
  gulp.src('./src/angular-match-height.js')
    .pipe(require('gulp-uglifyjs')('angular-match-height.min.js',{outSourceMap:true}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build',['__height','__angular','__bootstrap','__jquery'],()=>{

});

gulp.task('__height',()=>{
  gulp.src('./src/angular-match-height.js')
    .pipe(gulp.dest('./test/vendor/scripts/'));
});

gulp.task('__jquery',()=>{
  gulp.src('./vendor/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('./test/vendor/scripts/'));
});

gulp.task('__angular',()=>{
  gulp.src('./vendor/angular/angular.min.js')
    .pipe(gulp.dest('./test/vendor/scripts/'));
});

gulp.task('__bootstrap',['__bootstrap.css','__bootstrap.js']);

gulp.task('__bootstrap.js',()=>{
  gulp.src('./vendor/bootstrap/dist/js/*')
    .pipe(gulp.dest('./test/vendor/scripts/'));
});

gulp.task('__bootstrap.css',()=>{
  gulp.src('./vendor/bootstrap/dist/css/*')
    .pipe(gulp.dest('./test/vendor/styles/'));
});

gulp.task('serve', ['build'], function() {

    browserSync.init({
        server: "./test",
        port:8000,
        open : false
    });

    gulp.watch("./src/**/**/*.js", ['build']);
    gulp.watch("./src/**/**/*.html", ['build']);

});
