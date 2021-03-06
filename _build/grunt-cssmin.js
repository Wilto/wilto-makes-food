module.exports = function(grunt) {
	grunt.loadNpmTasks( "grunt-contrib-cssmin" );

	grunt.config( "cssmin", {
		options: {
			banner: '<%= banner %>',
			stripBanners: true
		},
		css: {
			src: [
				'<%= concat.css.dest %>'
			],
			dest: '<%= concat.css.dest %>'
		},
		crit: {
			src: [
				'<%= criticalcss.home.options.outputfile %>'
			],
			dest: '<%= criticalcss.home.options.outputfile %>'
		}
	});
};