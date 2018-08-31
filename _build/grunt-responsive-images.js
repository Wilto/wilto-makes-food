module.exports = function(grunt) {
	grunt.loadNpmTasks( "grunt-responsive-images" );

	grunt.config( "responsive_images", {
		standard: {
			options: {
				newFilesOnly: true,
				quality: 70,
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
				src: ['img/**.{jpg,gif,png}'],
				dest: '_site'
			}]
		},
		features: {
			options: {
				newFilesOnly: false,
				quality: 70,
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
				},{
					name: '6',
					width: 1280
				},{
					name: '7',
					width: 1800
				},{
					name: '8',
					width: 2200
				},{
					name: '9',
					width: 2600
				},{
					name: '10',
					width: 3000
				}]
			},
			files: [{
				expand: true,
				cwd: '_src',
				src: ['img/feat/**.{jpg,gif,png}'],
				dest: '_site'
			}]
		}
	});
};