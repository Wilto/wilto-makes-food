(function() {
	document.addEventListener( "DOMContentLoaded", function() {
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
			let imgObs = new IntersectionObserver( function( els, obs ) {
				els.forEach( function( el ) {
					if( el.isIntersecting ) {
						let img = el.target;

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
			}
		}
	});
}());