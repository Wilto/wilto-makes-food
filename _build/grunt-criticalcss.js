module.exports = function(grunt) {
	grunt.loadNpmTasks( "grunt-criticalcss" );

	var path = require( "path" ).resolve( "_site/_assets/css" );

	grunt.config( "criticalcss", {
		home: {
			options: {
				url: "https://wiltomakesfood.com",
				height: 600,
				filename: path + "/all.css",
				outputfile: path + "/crit/home.css"
			}
		},
		landing: {
			options: {
				url: "https://wiltomakesfood.com/recipes",
				height: 600,
				filename: path + "/all.css",
				outputfile: path + "/crit/landing.css"
			}
		},
		post: {
			options: {
				url: "https://wiltomakesfood.com/recipes/curry-rice/",
				height: 600,
				filename: path + "/all.css",
				outputfile: path + "/crit/post.css"
			}
		}
	});
};