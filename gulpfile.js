var gulp = require('gulp');
var concat = require('gulp-concat');
var insert = require('gulp-insert');
var path = require('path');
var fs = require('fs');
var template = fs.readFileSync('./template.jst', 'utf8');

gulp.task('default', function(){
  gulp.src(['src/*.js', '!src/index.js'])
    .pipe(insert.transform(function(contents, f){
      var ext = path.extname(f.path);
      var basename = path.basename(f.path, ext);
      return template
        .replace('{{filename}}', path.basename(f.path))
        .replace('{{contents}}', contents)
        .replace('{{basename}}', basename);
    }))
    .pipe(concat('dice.js', {newLine: '\r\n\r\n'}))
    .pipe(insert.prepend(fs.readFileSync('./requireshim.js')))
    .pipe(gulp.dest('./'));
});