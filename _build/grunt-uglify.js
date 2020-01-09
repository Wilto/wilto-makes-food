module.exports = function(grunt) {
	grunt.loadNpmTasks( "grunt-contrib-uglify-es" );

	grunt.config( "uglify", {
		alljs: {
			files: {
				'_site/_assets/js/offline.min.js': ['_src/_assets/js/offline.js'],
				'_site/_assets/js/offline-toggle.min.js': ['_src/_assets/js/offline-toggle.js'],
				'_site/_assets/js/lazyimg.min.js': ['_src/_assets/js/lazyimg.js'],
				'_site/_assets/js/sw-init.min.js': ['_src/_assets/js/sw-init.js'],
				'_site/_assets/js/analytics.min.js': ['_src/_assets/js/analytics.js']
			}
		},
		sw: {
			files: {
				'_site/service-worker.js': ['_site/service-worker.js']
			}
		}
	});
};