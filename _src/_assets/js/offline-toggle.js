(function() {
	const notify = function( txt, thendo ) {
		const notif = document.querySelector( ".notification" ),
			create = function( txt ) {
				let body = document.body,
					notif = document.createElement( "div" ),
					copy = document.createTextNode( txt );

				notif.classList.add( "notification","toast","notif-hed" );
				notif.setAttribute( "role", "alert" );

				notif.append( copy );
				body.insertBefore( notif, body.firstChild );
			}
			if( notif ) {
				notif.innerHTML = txt;
			} else {
				create( txt );
			}
			if( thendo ) {
				notif.addEventListener( "transitionend", function( e ){ 
					e.target.remove();
				});
				notif.classList.add( thendo );
			}
	}
	window.addEventListener("load", function() {
		if( !navigator.onLine ) {
			notify( "Looks like you’re offline.", null );
		}
		window.addEventListener( "online", function( e ) {
			let imgs = document.querySelectorAll( "img:not([data-lazy]" );

			imgs.forEach( function( img ) {
				console.log( img.src );
				img.src = img.src;
			});
			notify( "You’re back online!", "fadeout" );
			window.document.dispatchEvent(new Event("loadAsyncImages", {
				bubbles: true,
				cancelable: true
			}));
		});
		window.addEventListener( "offline", function( e ) {
			notify( "Looks like you’re offline.", null );
		});
	});
}());