(function() {
	var searchWrap = document.querySelector( ".search" ).parentElement,
		searchInput = searchWrap.querySelector( 'form input[name="q"]' ),
		el = function( el ) {
			return document.createElement( el );
		},
		closeResults = function() {
			var oldResults = document.querySelector( ".search-results" );

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
			var query = this.value;

			if( !this.value ) {
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
				createResult = function( res ) {
					var resultItem = el( "li" ),
						img  = el( "img" ),
						hed  = el( "h3" ),
						link = el( "a" ),
						copy = el( "div" );

					link.setAttribute( "href", res.id );
					link.innerHTML = res.title;

					img.setAttribute( "src", res.img );

					resultItem.classList.add( "item", "result-split" );
					hed.classList.add( "article-hed" );
					copy.classList.add( "art-content" );

					hed.appendChild( link );
					copy.appendChild( hed );

					resultItem.appendChild( img );
					resultItem.appendChild( copy );

					return resultItem;
				};

			resultContainer.classList.add( "search-results", "results" );

			results.forEach( res => {
				resultContainer.appendChild( createResult( res ) );
			});

			closeResults();
			searchWrap.appendChild( resultContainer );
		},
		searchIndex;

	searchInput.addEventListener( "keyup", fetchResults );

	document.addEventListener( "click", function( e ) {
		if( !e.target.closest( ".search" ) && !e.target.closest( ".search-results" ) ) {
			closeResults();
		}
	});

	document.addEventListener( "keyup", function( e ) {
		if( e.key === "Escape" ) {
			closeResults();
		}
	});

	searchInput.addEventListener( "keyup", function( e ) {
		if( this.value.length === 0 ) {
			closeResults();
		}
	});

	searchInput.addEventListener( "click", fetchResults );

}());