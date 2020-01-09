(function() {
	function loadAsync() {
		var lazyimgs = document.querySelectorAll( '[data-lazy]' ),
			attrswap = function( img ) {
				img.src = img.getAttribute( 'data-src' );
				img.setAttribute( "sizes", img.getAttribute( 'data-sizes' ) );
				img.setAttribute( "srcset", img.getAttribute( 'data-srcset' ) );
				img.parentElement.setAttribute( "class", "shown" );
			},
			supports = "IntersectionObserver" in window 
					&& "IntersectionObserverEntry" in window 
					&& "intersectionRatio" in window.IntersectionObserverEntry.prototype;

		if( supports ) {
			var imgObs = new IntersectionObserver( function( els, obs ) {
				els.forEach( function( el ) {
					if( el.isIntersecting ) {
						var img = el.target;

						attrswap( img );
						imgObs.unobserve( img );
					}
				});
			});

			[].slice.call( lazyimgs ).forEach(function(lazyimg) {
				lazyimg.parentElement.classList.add( 'fadein' );
				imgObs.observe( lazyimg );
			});
		} else {
			for( i = 0; i < lazyimgs.length; i++ ){
				attrswap( lazyimgs[ i ] );
				lazyimg.parentElement.classList.add( 'fadein' );
			}
		}
	};

	document.addEventListener( "DOMContentLoaded", loadAsync );
	document.addEventListener( "loadAsyncImages", loadAsync );
}());