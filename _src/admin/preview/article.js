import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

// Preview component for a Page
const Article = createClass({
	render() {
		const {entry, fieldsMetaData} = this.props;

		// Image
		let imgEl = ( entry ) => {
			let oldImg = entry.getIn(['data', 'img']),
				newImg = entry.getIn(['data', 'feat_img', 'img' ]),
				alt = entry.getIn(['data', 'alt']) || entry.getIn([ 'data', 'feat_img', 'alt' ], null ) || '';

				if( oldImg ) {
					return h( 'img', { src: '/img/' + oldImg + '-1.jpg', alt: alt });
				}
				if( newImg ) {
					return h( 'img', { src: newImg, alt: alt });
				}
		}

		let ret = [];
		const rMeta = fieldsMetaData.getIn([ 'related' ], null ) || [];

		rMeta && rMeta.forEach( r => {
			let title = Object.keys( r.toJS() )[ 0 ],
				fullMeta = r.get( title ),
				relImg = ( fullMeta ) => {
					let oldImg = fullMeta.get( 'img' ),
						newImg = fullMeta.getIn(['feat_img', 'img' ]),
						alt = entry.getIn(['data', 'alt']) || entry.getIn([ 'data', 'feat_img', 'alt' ], null ) || '';

						if( oldImg ) {
							return h( 'img', { src: '/img/' + oldImg + '-1.jpg', alt: alt });
						}
						if( newImg ) {
							return h( 'img', { src: newImg, alt: alt });
						}
				};

 
			ret.push(
				h( 'article', { className: 'related-article' },
					relImg( fullMeta ),
					h( 'div', {}, 
						h( 'h4', { className: 'rel-hed' }, 
							h( 'a', { href: "#" }, title ),
						),
						h( 'p', { className: 'rel-lede' }, fullMeta.get( 'subhed' ) )
					)
				)
			)
		});

		let related = ret.length > 0 && h( 'div', { className: 'related-articles' }, 
				h( 'h3', { className: 'related-hed' }, "Related Recipe" + ( ret.length > 1 ? "s" : "" )),
				ret
		);

		let caption = ( entry ) => {
			let capt = entry.getIn([ 'data', 'feat_img', 'capt' ], null ) || entry.getIn([ 'data', 'capt' ]);
			return capt && h( 'figcaption', { className: 'caption' }, 
				entry.getIn([ 'data', 'feat_img', 'capt' ], null )
			);
		}

		let alt = entry.getIn(['data', 'alt']) || entry.getIn([ 'data', 'feat_img', 'alt' ], null ) || '';

		return html`
		<main className="col fonts">
			<div className="intro">
				<header role="banner" className="recipeheader">
					<h2 className="recipe-hed">${entry.getIn(["data", "title"], null)}</h2>
					<span class="meta"></span>
				</header>

				<figure className="feat-thumb">
					${ h('p', { className: 'alt-overlay'}, 
						h('span', {}, "alt: "),
						h('code', {}, alt )
					)}
					${ imgEl( entry ) }
					${ caption( entry ) }
				</figure>
				<div className="lede">${this.props.widgetFor("lede")}</div>
				${this.props.widgetFor("body")}
			</div>
		</main>`;
	}
});

export default Article;