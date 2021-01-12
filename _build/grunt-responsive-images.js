module.exports = function(grunt) {
	grunt.loadNpmTasks( "grunt-responsive-images" );

	grunt.config( "responsive_images", {
		standard: {
			options: {
				newFilesOnly: true,
				quality: 80,
				sizes: [{
					name: '1',
					width: 320,
				}]
			},
			files: [{
				expand: true,
				cwd: '_src',
				src: ['img/*.{jpg,gif,png}'],
				dest: '_site'
			}]
		}
	});
};