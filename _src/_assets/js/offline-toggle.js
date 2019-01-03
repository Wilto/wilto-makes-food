(function() {
	const notify = function( txt, thendo, more ) {
		const notif = document.querySelector( ".offline-notice" ),
			create = function( txt, more ) {
				var body = document.body,
					notif = document.createElement( "div" ),
					copy = document.createTextNode( txt ),
					morelink, moretxt, docel, innerlabel;

				if( more ) {
					docel = document.createElement( "div" );
					innerlabel = document.createElement( "p" );
					morelink = document.createElement( "a" );
					moretxt = document.createTextNode( more.txt );

					docel.setAttribute( "role", "document" );
					docel.setAttribute( "tabindex", "0" );

					notif.setAttribute( "role", "alertdialog" );
					notif.setAttribute( "aria-labelledby", "testid" );

					morelink.href = more.href;

					innerlabel.id = "testid";
					innerlabel.classList.add( "notif-desc" );
					innerlabel.append( copy );

					morelink.append( moretxt );
					morelink.classList.add( "notif-cta" );
					docel.append( innerlabel );
					docel.append( morelink );
					notif.classList.add( "notification","toast", "offline-notice" );

					notif.append( docel );
				} else {
					notif.setAttribute( "role", "alert" );
					notif.classList.add( "notification","toast","notif-hed", "offline-notice" );

					notif.append( copy );
				}

				body.insertBefore( notif, body.firstChild );
			}
			if( notif ) {
				notif.innerHTML = txt;
			} else {
				create( txt, more );
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
			var imgs = document.querySelectorAll( "img:not([data-lazy]" );

			imgs.forEach( function( img ) {
				img.src = img.src;
			});
			notify( "You’re back online!", "fadeout" );
			window.document.dispatchEvent(new Event("loadAsyncImages", {
				bubbles: true,
				cancelable: true
			}));
		});
		window.addEventListener( "offline", function( e ) {
			notify( "Looks like you’re offline.", null, { "href" : "/offline", "txt" : "Browse offline" } );
		});
	});
}());