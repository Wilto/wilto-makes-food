module.exports = function(grunt) {
	grunt.loadNpmTasks( "grunt-contrib-concat" );

	grunt.config( "concat", {
		options: {
			banner: '<%= banner %>'
		},
		css: {
			src: [
				'_src/_assets/css/*'
			],
			dest: '_site/_assets/css/all.css'
		}
	});
};