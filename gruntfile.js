/*global module:false,require:false*/

module.exports = function(grunt) {
	'use strict';

	// Initial project configuration.
	grunt.initConfig({
		pkg: '<json:package.json>',
		banner: '/*! wiltomakesfood.com - v<%= pkg.version %> - */'
	});

	grunt.loadTasks( "_build" );

	// Default task.
	grunt.registerTask('default', [
		'bump',
		'copy',
		'concat:css',
		'uglify:alljs',
		'responsive_images',
		'imagemin',
		'cssmin:css'
	]);

	grunt.registerTask('crit', [
		'criticalcss',
		'cssmin:crit'
	]);

	grunt.registerTask('watch-css', [
		'concat:css',
		'cssmin'
	]);

	grunt.registerTask('watch-js', [
		'uglify'
	]);
};