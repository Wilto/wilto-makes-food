module.exports = function(grunt) {
	grunt.loadNpmTasks( "grunt-contrib-copy" );

	grunt.config( "copy", {
		fonts: {
			expand: true,
			flatten: true,
			src: ['_src/_assets/css/fonts/*'],
			dest: '_site/_assets/css/fonts/',
		},
		media: {
			expand: true,
			flatten: true,
			src: ['_src/_assets/media/*'],
			dest: '_site/_assets/media/',
		}
	});
};