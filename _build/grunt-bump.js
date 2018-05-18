module.exports = function(grunt) {
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
}