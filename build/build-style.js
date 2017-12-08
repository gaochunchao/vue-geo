const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');

// 编译less
gulp.task('css', function () {
  gulp.src('../src/styles/index.less')
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie > 8']
    }))
    .pipe(cleanCSS())
    .pipe(rename('vue-geo.css'))
    .pipe(gulp.dest('../dist/styles'));
});

// 拷贝字体文件
gulp.task('fonts', function () {
  gulp.src('../src/styles/fonts/*.*')
    .pipe(gulp.dest('../dist/styles/fonts'));
});
// 拷贝图片
gulp.task('images', function () {
  gulp.src('../src/styles/images/*/*.*')
    .pipe(gulp.dest('../dist/styles/images'));
});
gulp.task('default', ['css', 'fonts', 'images']);
