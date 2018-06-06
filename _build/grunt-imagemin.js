module.exports = function(grunt) {
	grunt.loadNpmTasks( "grunt-contrib-imagemin" );

	grunt.config( "imagemin", {
		default: {
			files: [{
				expand: true,
				progressive: true,
				cwd: '_site/img',
				src: ['*.{png,jpg,gif}'],
				dest: '_site/img'
			}]
		}
	});
};