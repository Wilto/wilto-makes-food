module.exports = function(grunt) {
	grunt.loadNpmTasks( "grunt-contrib-imagemin" );

	const mozjpeg = require( "imagemin-mozjpeg" );
	const webp = require( "imagemin-webp" );

	grunt.config( "imagemin", {
		default: {
			options: {
				optimizationLevel: 3,
				use: [mozjpeg()]
			},
			files: [{
				expand: true,
				progressive: true,
				cwd: '_site/img',
				src: ['*.{png,jpg,gif}'],
				dest: '_site/img'
			}]
		},
		webp: {
			options: {
				use: [webp({
					quality: 70
				})]
			},
			files: [{
				expand: true,
				cwd: '_site/img',
				src: ["**/*.jpg"],
				dest: "_site/img",
				ext: ".webp"
			}]
		}
	});
};