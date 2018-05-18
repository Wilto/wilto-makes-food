module.exports = function(grunt) {
	grunt.loadNpmTasks( "grunt-contrib-cssmin" );

	grunt.config( "cssmin", {
		options: {
			banner: '<%= banner %>',
			stripBanners: true
		},
		css: {
			src: ['<%= concat.css.dest %>'],
			dest: '<%= concat.css.dest %>'
		},
		crit: {
			expand: true,
			src: [ 
				"_site/_assets/css/crit/*.css"
			],
			dest: "."
		}
	});
};