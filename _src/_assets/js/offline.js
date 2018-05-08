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
							if( item !== null ) {
								return item === find;
							}
						});
					},
					cachedItems = [];

				categorized.forEach(entry => {
					let found = lookup( event.data.urls, "https://wiltomakesfood.com" + entry.url );

					if( found ) {
						let pattern = new RegExp(p.protocol + p.domain + p.tld + p.params, 'gi'),
							offline = window.wmf.allPosts[ found.substr(26) ]; // This is _terrible_.

						if( offline ) {
							cachedItems.push( '<li><a href="' + offline.url + '" class="offline-item">' + offline.title + '</a></li>' );
						}
					}
				});

				if( cachedItems.length !== 0 ) {
					render.push( '<h3 class="recipe-subhed offline-subhed offline-landing">' + landing.title + '</h3>' );

					render.push( '<ul class="offline-items">' );
					Array.prototype.push.apply( render, cachedItems );
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