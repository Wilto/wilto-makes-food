/*global module:false,require:false*/
module.exports = function(grunt) {
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration.
	grunt.initConfig({
		pkg: '<json:package.json>',
		banner: '/*! wiltomakesfood.com - v<%= pkg.version %> - */',
		concat: {
			options: {
				banner: '<%= banner %>'
			},
			css: {
				src: [
					'_src/_assets/css/*'
				],
				dest: '_site/_assets/css/all.css'
			}
		},
		copy: {
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
			},
			sw: {
				expand: true,
				flatten: true,
				src: ['_src/service-worker.js'],
				dest: '_site/',
			},
		},
		watch: {
			css: {
				files: ['_src/_assets/css/**/*'],
				tasks: 'watch-css'
			},
			js: {
				files: ['_src/_assets/js/**/*'],
				tasks: 'watch-js'
			}
		},
		uglify: {
			all: {
				files: {
					'_site/_assets/js/offline.min.js': ['_src/_assets/js/offline.js']
				}
			}
		},
		cssmin: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			css: {
				src: [
					'<%= concat.css.dest %>'
				],
				dest: '<%= concat.css.dest %>'
			}
		},
		responsive_images: {
			options: {
				newFilesOnly: false,
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
		},
		clean: ['_site'],
		imagemin: {
			default: {
				files: [{
					expand: true,
					cwd: '_site',
					src: ['img/*.{png,jpg,gif}'],
					dest: '/_site/img/'
				}]
			}
		}
	});

	// Default task.
	grunt.registerTask('default', [
		'copy',
		'concat:css',
		'uglify',
		'responsive_images',
		'imagemin',
		'cssmin'
	]);

	// NOTE these watch tasks try to run only relevant tasks per file save
	grunt.registerTask('watch-css', [
		'concat:css',
		'cssmin'
	]);

	grunt.registerTask('rebuild', [
		'clean',
		'default',
		'imagemin'
	]);

	grunt.registerTask('watch-js', [
		'uglify'
	]);

};
