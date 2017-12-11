const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const tap = require('gulp-tap');//src 文件遍历

const Util = {
  // 使用tap对模板文件进行替换
  replaceTemplate: (gulpFile, replaceJsonObj) => {
    let contentStr = gulpFile.contents.toString();
    for (let replaceKey in replaceJsonObj) {
      let reg = new RegExp(replaceKey, 'g');
      contentStr = contentStr.replace(reg, replaceJsonObj[replaceKey]);
    }
    return new Buffer(contentStr);
  }
}

// 编译less
gulp.task('css', function () {
  let manifest = require('./rev/css/rev-manifest.json');
  gulp.src('../src/styles/index.less')
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie > 8']
    }))
    .pipe(cleanCSS())
    .pipe(tap((file) => {
      file.contents = Util.replaceTemplate(file, manifest);
    }))
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
