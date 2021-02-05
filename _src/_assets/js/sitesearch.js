(function() {
	var searchWrap = document.querySelector( ".search" ).parentElement,
		searchInput = searchWrap.querySelector( 'form input[name="q"]' ),
		el = function( el ) {
			return document.createElement( el );
		},
		closeResults = function() {
			var oldResults = document.querySelector( ".search-results" ),
				searchInput = oldResults && oldResults.querySelector( '[name="q"]' );

			oldResults && searchWrap.removeChild( oldResults );
		},
		renderError = function( results ) {
			var resultContainer = el( 'div' ),
				copy = el( "div" );

			copy.innerHTML = "<p>Sorry, no results found.</p>";

			resultContainer.classList.add( "search-results", "results" );
			resultContainer.appendChild( copy );

			closeResults();
			searchWrap.appendChild( resultContainer );
		},
		fetchResults = function( e ) {
			var query = e.target.value;

			if( !query || query.length <= 1 || ( typeof e.key !== undefined && e.key === "Escape" ) ) {
				closeResults();
				return;
			}

			fetch( '/posts.json' )
				.then( response => response.json() )
				.then( json => {
					var results = [];
					json.forEach( item => {
						if( item.title.search( new RegExp( query, "i" ) ) > -1 ) {
							results.push( item );
						}
					});

					if( results.length === 0 ) {
						renderError();
					} else {
						renderResults( results );
					}
				})
				.catch( err => console.log( err ) );
		},
		renderResults = function( results ) {
			var resultContainer = el( 'ol' ),
				createResult = function( res, ind ) {
					var resultItem = el( "li" ),
						img  = el( "img" ),
						hed  = el( "h3" ),
						link = el( "a" ),
						copy = el( "div" );

					link.setAttribute( "href", res.id );
					link.innerHTML = res.title;
					link.setAttribute( "tabindex", 0 );

					img.setAttribute( "src", res.img );
					img.setAttribute( "aria-labelledby", "res-" + ind );

					resultItem.classList.add( "item", "result-split" );
					hed.classList.add( "article-hed" );
					hed.id = "res-" + ind;

					copy.classList.add( "art-content" );

					hed.appendChild( link );
					copy.appendChild( hed );

					resultItem.appendChild( img );
					resultItem.appendChild( copy );

					return resultItem;
				};

			resultContainer.classList.add( "search-results", "results" );

			results.forEach( ( res, i ) => {
				resultContainer.appendChild( createResult( res, i ) );
			});

			closeResults();
			searchWrap.appendChild( resultContainer );
		},
		searchIndex;

	searchInput.addEventListener( "keyup", fetchResults );
	searchInput.addEventListener( "click", fetchResults );

	document.addEventListener( "click", function( e ) {
		if( !e.target.closest( ".search" ) && !e.target.closest( ".search-results" ) ) {
			closeResults();
		}
	});

}());