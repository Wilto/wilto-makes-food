(function() {
	var search = document.querySelector( ".search" ),
		searchForm = search.querySelector( "form" ),
		searchIndex;

	searchForm.addEventListener( "submit", function( e ) {
		var query = this.querySelector( '[name="q"]' ).value,
			oldResults = document.querySelector( ".search-results" ),
			el = function( el ) {
				return document.createElement( el );
			},
			renderResults = function( results ){
				var resultContainer = el( 'ol' ),

					createResult = function( res ) {
						var resultItem = el( "li" ),
							img  = el( "img" ),
							hed  = el( "h3" ),
							lede = el( "div" ),
							link = el( "a" ),
							copy = el( "div" );

						link.setAttribute( "href", res.id );
						link.innerHTML = res.title;

						lede.classList.add( "result-lede" );
						lede.innerHTML = "<p>" + res.lede + "</p>"; // Listen, nobody is keeping score here.

						img.setAttribute( "src", res.img );

						resultItem.classList.add( "item", "result-split" );
						hed.classList.add( "article-hed" );
						copy.classList.add( "art-content" );

						hed.appendChild( link );
						copy.appendChild( hed );
						copy.appendChild( lede );

						resultItem.appendChild( img );
						resultItem.appendChild( copy );

						return resultItem;
					};

				resultContainer.classList.add( "search-results", "results" );

				results.forEach( res => {
					resultContainer.appendChild( createResult( res ) );
				});

				oldResults && search.parentElement.removeChild( oldResults );
				search.parentElement.appendChild( resultContainer );
			};

		fetch( '/posts.json' )
			.then( response => response.json() )
			.then( json => {
				var results = [];
				json.forEach( item => {
					if( item.title.search( new RegExp( query, "i" ) ) > -1 ) {
						results.push( item );
					}
				});
				renderResults( results );
			})
			.catch( err => console.log( err ) );
		e.preventDefault();
	});

	searchForm.querySelector( "input" ).addEventListener( "blur", function( e ) {
		var oldResults = document.querySelector( ".search-results" );

		oldResults && search.parentElement.removeChild( oldResults );
	});
}());