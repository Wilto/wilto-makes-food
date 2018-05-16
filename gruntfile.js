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
			offline: {
				files: {
					'_site/_assets/js/offline.min.js': ['_src/_assets/js/offline.js']
				}
			},
			sw: {
				files: {
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
		}
	});

	grunt.registerTask('bump', function() {
		let metafile = "_src/_data/metadata.json",
			metadata,
			currentVers,
			nextVers;

		if ( !grunt.file.exists( metafile ) ) {
			grunt.log.error( "File " + metafile + " not found" );
			return;
		}

		metadata = grunt.file.readJSON( metafile );
		currentVers = metadata[ "build" ];

		nextVers = currentVers + 1

		metadata["build"] = nextVers;

		grunt.file.write( metafile, JSON.stringify( metadata, null, 2 ) );
		grunt.log.ok( "Build number: " + nextVers );
	});

	// Default task.
	grunt.registerTask('default', [
		'bump',
		'clean',
		'copy',
		'concat:css',
		'uglify:offline',
		'responsive_images',
		'imagemin',
		'cssmin:css'
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
