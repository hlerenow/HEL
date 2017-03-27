var gulp = require("gulp");
var bowserSync = require("browser-sync");
var reload=bowserSync.reload;
var nodemon = require('gulp-nodemon');
var path = require("path");
var cmd=require("node-cmd");
var del=require("del");

var webpackConfig = require(path.join(__dirname, "admin/webpack.config"));
var appIndex = path.join(__dirname, "public/admin/src/index.js");
var webpackBulidPath=path.join(__dirname,"public/admin");

var reloadTimer=null;
var reloadTimerWebpack=null;


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
        port:3000

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
		ignore: ["views/*", "admin/*"],
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
		console.log(e);
	}
});

gulp.task("app_run",function(){
		cmd.get("node app",function(data){
		console.log(data);
	});
})

gulp.task("clear_map",function(cb){
	del([
			'admin/*.map',
			'admin/js/chunk/*.map'
		],cb);
});

gulp.task("webpack",function(){
	gulp.watch(path.join(webpackBulidPath,"src/**")).on("change",function(cb){
			cmd.get("cd public/admin & webpack");
	});
});

// gulp.task("wacth_webpack_node",["webpack",],function(){
// 	cmd.get("node app",function(data){
// 		console.log(data);
// 	});
// 	gulp.watch(path.join(webpackBulidPath,"src/**/*")).on("change",function(cb){
// 			clearTimeout(reloadTimerWebpack);
// 			reloadTimerWebpack=null;
// 			console.log("wepack 文件改变");
// 			reloadTimerWebpack=setTimeout(function(){
// 				console.log("运行webpack");
// 				cmd.run("gulp webpack");
// 			},1000);
// 	});
// });

gulp.task("default", ["nodemon"],function(){
	// gulp.watch(path.join(webpackBulidPath,"src/*"),['webpack']);
});