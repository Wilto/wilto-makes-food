module.exports = function(grunt) {
	grunt.loadNpmTasks( "grunt-criticalcss" );

	var path = require( "path" ).resolve( "_site/_assets/css" );

	grunt.config( "criticalcss", {
		home: {
			options: {
				url: "https://wiltomakesfood.com",
				filename: path + "/all.css",
				outputfile: path + "/crit-home.css"
			}
		}
	});
};