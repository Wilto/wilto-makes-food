module.exports = function(grunt) {
	grunt.loadNpmTasks( "grunt-responsive-images" );

	grunt.config( "responsive_images", {
		standard: {
			options: {
				newFilesOnly: false,
				quality: 80,
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
			files: [{
				expand: true,
				cwd: '_src',
				src: ['img/*.{jpg,gif,png}'],
				dest: '_site'
			}]
		},
		features: {
			options: {
				newFilesOnly: false,
				quality: 80,
				sizes: [{
					name: '1',
					width: 640
				},{
					name: '2',
					width: 820
				},{
					name: '3',
					width: 1200
				},{
					name: '4',
					width: 1800
				},{
					name: '5',
					width: 2200
				},{
					name: '6',
					width: 2800
				},{
					name: '7',
					width: 3200
				}]
			},
			files: [{
				expand: true,
				cwd: '_src',
				src: ['img/feat/*.{jpg,gif,png}'],
				dest: '_site'
			}]
		}
	});
};