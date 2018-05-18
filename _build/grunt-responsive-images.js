module.exports = function(grunt) {
	grunt.loadNpmTasks( "grunt-responsive-images" );

	grunt.config( "responsive_images", {
		options: {
			newFilesOnly: true,
			quality: 60,
			sizes: [{
				name: '1',
				width: 320,
			},{
				name: '2',
				width: 450
			},{
				name: '3',
				width: 640
			},{
				name: '4',
				width: 820
			},{
				name: '5',
				width: 1024
			}]
		},
		files: {
			expand: true,
			cwd: '_src',
			src: ['img/**.{jpg,gif,png}'],
			dest: '_site'
		}
	});
};