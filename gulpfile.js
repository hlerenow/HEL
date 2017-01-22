var gulp=require("gulp");
var bowserSync=require("browser-sync");
var nodemon = require('gulp-nodemon');

	
	gulp.task("bowserSync",function(){
		var files = [
		  'views/**/*.html',
		  'views/**/*.css',
		  'views/**/*.js',
		  'views/**/*.ejs'
		  ];
		bowserSync.init({
			files:files,
			proxy:"http://localhost:3000"
		});			
	});


	gulp.task('nodemon',function() {
	  return nodemon({
	    script: 'app',
	    ext:"js",
	    ignore:["views/*","HEL_FW/*"],
	    watch:"./"
	    // tasks:["bowserSync"]
	  }).on('start', function() {
	  		console.log("nonman start");
	  });
	  
	});

	gulp.task("default",["nodemon"]);