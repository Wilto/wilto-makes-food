(function() {
	if( 'serviceWorker' in navigator ) {
		let mesChan = new MessageChannel(),
			p = {
				protocol: '^(http(s)?(:\/\/))?(www\.)?',
				domain: '[a-zA-Z0-9-_\.]+',
				tld: '(\.[a-zA-Z0-9]{2,})',
				params: '([-a-zA-Z0-9:%_\+.~#?&//=]*)'
			};

		mesChan.port1.onmessage = function(event) {
			let offline = document.querySelector( '.offline-reader' ),
				render = [],
				filter = function( obj, filter ) {
					let filtered = [];
					for (var key in obj ) {
						if( obj[key].type.toLowerCase() === filter ) {
							obj[key].url = key;
							filtered.push( obj[key] );
						}
					}
					return filtered;
				};

			let landings = filter( window.wmf.allPosts, "landing" );

			landings.forEach(landing => {
				let title = landing.title.toLowerCase(),
					categorized = filter( window.wmf.allPosts, title.substring(0, title.length - 1) ),
					lookup = function( refObj, find ) {
						return refObj.find( function( item ) {
							let pattern = new RegExp(p.protocol + p.domain + p.tld + p.params, 'gi'),
								match = pattern.exec( item );

							if( match !== null ) {
								return match[ 6 ] === find;
							}
						});
					};

				render.push( '<h3 class="recipe-subhed offline-subhed offline-landing">' + landing.title + '</h3>' );

				let cachedItems = [];

				categorized.forEach(entry => {
					let found = lookup( event.data.urls, entry.url );

					if( found ) {
						let pattern = new RegExp(p.protocol + p.domain + p.tld + p.params, 'gi'),
							offline = window.wmf.allPosts[ pattern.exec( found )[ 6 ] ];

						cachedItems.push( '<li><a href="' + offline.url + '" class="offline-item">' + offline.title + '</a></li>' );
					}
				});

				if( cachedItems.length === 0 ) {
					render.push( '<p>Nothing cached</p>' );
				} else {
					render.push( '<ul>' );
					render.push( cachedItems );
					render.push( '</ul>' );
				}
			});
			offline.innerHTML = render.join('');
		};

		if( navigator.serviceWorker.controller ) {
			navigator.serviceWorker.controller.postMessage( "getCached", [mesChan.port2] );
		}
	}
}());