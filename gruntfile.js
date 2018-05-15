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
			}
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
					'_site/_assets/js/offline.min.js': ['_src/_assets/js/offline.js'],
					'_site/service-worker.js': ['_site/service-worker.js']
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
			},
			crithome: {
				src: [
					'_src/_includes/crit/crit-home.css'
				],
				dest: '_src/_includes/crit/crit-home.css'
			},
			critpost: {
				src: [
					'_src/_includes/crit/crit-post.css'
				],
				dest: '_src/_includes/crit/crit-post.css'
			},
			critlanding: {
				src: [
					'_src/_includes/crit/crit-landing.css'
				],
				dest: '_src/_includes/crit/crit-landing.css'
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
					cwd: '_site/img',
					src: ['*.{png,jpg,gif}'],
					dest: '_site/img'
				}]
			}
		},
		criticalcss: {
			home: {
				options: {
					url: "http://localhost:8000",
					outputfile: "_src/_includes/crit/crit-home.css",
					filename: "_site/_assets/css/all.css",
					height: 500
				}
			},
			home: {
				options: {
					url: "http://localhost:8000/recipes/",
					outputfile: "_src/_includes/crit/crit-landing.css",
					filename: "_site/_assets/css/all.css",
					height: 500
				}
			},
			post: {
				options: {
					url: "http://localhost:8000/recipes/curry-rice/",
					outputfile: "_src/_includes/crit/crit-post.css",
					filename: "_site/_assets/css/all.css",
					height: 500
				}
			}
		}
	});

	// Default task.
	grunt.registerTask('default', [
		'copy',
		'concat:css',
		'uglify',
		'responsive_images',
		'criticalcss',
		'imagemin',
		'cssmin'
	]);

	grunt.registerTask('critical', [
		'criticalcss',
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
