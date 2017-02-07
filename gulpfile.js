var gulp = require("gulp");
var bowserSync = require("browser-sync");
var reload=bowserSync.reload;
var nodemon = require('gulp-nodemon');
var webpackStream = require(("webpack-stream"));
var path = require("path");
var cmd=require("node-cmd");

var webpackConfig = require(path.join(__dirname, "public/admin/webpack.config"));
var appIndex = path.join(__dirname, "public/admin/src/index.js");
var webpackBulidPath=path.join(__dirname,"public/admin");

var reloadTimer=null;

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
        server: {
            baseDir: "./public/admin"
        },
        port:4000

	});

	gulp.watch(files).on("change", function(cb){

			clearTimeout(reloadTimer);
			reloadTimer=null;

			reloadTimer=setTimeout(function(){
				reload();
			},500);

	}); 
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
		console.log("erro");
	}
});

gulp.task("app_run",function(){
		cmd.get("node app",function(data){
		console.log(data);
	});
})

gulp.task("watch_webpack",["webpack","bowserSync"],function(){
	gulp.watch(path.join(webpackBulidPath,"src/*"),['webpack']);
});

gulp.task("wacth_webpack_node",["webpack",],function(){
	cmd.get("node app",function(data){
		console.log(data);
	});
	gulp.watch(path.join(webpackBulidPath,"src/*"),['webpack']);
});

gulp.task("default", ["nodemon"],function(){
	// gulp.watch(path.join(webpackBulidPath,"src/*"),['webpack']);
});