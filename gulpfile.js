var gulp = require("gulp");
var bowserSync = require("browser-sync");
var reload=bowserSync.reload;
var nodemon = require('gulp-nodemon');
var webpackStream = require(("webpack-stream"));
var path = require("path");

var webpackConfig = require(path.join(__dirname, "public/admin/webpack.config"));
var appIndex = path.join(__dirname, "public/admin/src/index.js");
var webpackBulidPath=path.join(__dirname,"public/admin");


gulp.task("bowserSync", function() {
	var files = [
		'views/**/*.html',
		'views/**/*.css',
		'views/**/*.js',
		'views/**/*.ejs',
		'public/admin/js/*.js',
		'public/admin/*.html'
	];
	bowserSync.init({
		files: files,
		proxy: "http://localhost:3000"
	});

	gulp.watch(files).on("change", reload); 
});


gulp.task('nodemon', function() {
	return nodemon({
		script: 'app',
		ext: "js",
		ignore: ["views/*", "public/admin/*"],
		watch: "./"
			// tasks:["bowserSync"]
	}).on('start', function() {
		console.log("nonman start");
	});

});

gulp.task("webpack",function() {
	
	try{
	 gulp.src(appIndex)
			.pipe(webpackStream(webpackConfig))
			.pipe(gulp.dest(webpackBulidPath));
	}catch(e){

	}
})

gulp.task("default", ["nodemon"],function(){
	// gulp.watch(path.join(webpackBulidPath,"src/*"),['webpack']);
});