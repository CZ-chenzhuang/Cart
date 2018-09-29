var gulp = require("gulp");
var sass = require("gulp-sass");
var cssnano = require("gulp-cssnano");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");

gulp.task("sass",function(){
	gulp.src("./src/sass/*.scss")
	.pipe(sass())
	.pipe(cssnano())
	.pipe(rename({"suffix" : ".min"}))
	.pipe(gulp.dest("./dist/css"))
})

