import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

// Preview component for a Page
const Recipe = createClass({
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
						alt = fullMeta.getIn(['alt']) || fullMeta.getIn([ 'feat_img', 'alt' ], null ) || '';

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
				h( 'h3', { className: 'related-hed' }, "Related Article" + ( ret.length > 1 ? "s" : "" )),
				ret
		);

		// Ingredients
		const ings = entry.getIn([ 'data', 'ingredient_steps'], null );
		let inglist = ingList => {
			let ret = [];
			ingList && ingList.map( ingItem => {
				let amt = ingItem.get( 'amt_whole' ) + ingItem.get( 'amt_frac' ) + " " + ingItem.get( 'measure' );
				let returnNote = (test) => { 
					let note = ingItem.get( 'notes' );
					let notelink = ingItem.get( 'notehref' );
					
					return notelink ? h( 'a', { href: notelink }, note ) : note;
				};
				ret.push( 
					h( 'li', {},
						h( 'p', {}, 
							h( 'span', { className: "amt" },
								ingItem.get( 'amt_whole' ),
								h( 'b', { className: "frac" }, ingItem.get( 'amt_frac' ) ), " ",
								ingItem.get( 'measure' ), " ",
								ingItem.get( 'name' ), " ",
								ingItem.get( 'notes' ) ? " (" : '',
								ingItem.get( 'notes' ) ? returnNote( ingItem ) : '',
								ingItem.get( 'notes' ) ? ")" : '', // WHATEVER
								( ingItem.get( 'optional' ) ? h( 'span', { className: 'opt' }, 'Optional' ) : '' )
							)
						)
					)
				);
			});
			return ret;
		};
		let ingsteps = ings.map( ing => {
			const title = ing.get( 'title' );
			const ingList = ing.get( 'ingredients' );

			return h( 'div', {}, 
				( title ? h( 'h4', { className: 'recipe-subhed' }, ing.get( 'title' ) ) : "" ),
				h( 'ul', { className: 'ingredients ingredients-step' },
					inglist( ingList )
				)
			)
		});
		let ingredients = h( 'div', {}, 
			h( 'h3', { className: 'inline-hed' }, "Ingredients" ),
			ingsteps
		);

		// Instructions
		const inst = entry.getIn([ 'data', 'instruction_steps'], null );

		let instlist = instList => {
			let ret = [];
			instList && instList.map( instItem => {
				let step = instItem.get( 'instruction' );
				ret.push( 
					h( 'li', {}, 
						h( 'p', {}, step )
					)
				);
			});
			return ret;
		};
		let inststeps = inst.map( inst => {
			const title = inst.get( 'title' );
			const instList = inst.get( 'instructions' );

			return h( 'div', {}, 
				( title ? h( 'h4', { className: 'recipe-subhed' }, inst.get( 'title' ) ) : "" ),
				h( 'ol', { className: 'steps e-instructions' },
					instlist( instList )
				)
			)
		});
		let instructions = h( 'div', { className: "instructions" }, 
			h( 'h3', { className: 'inline-hed' }, "Instructions" ),
			inststeps
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
					<dl className="meta">
						<dt>Serves</dt>
						<dd>${entry.getIn(["data", "meta", "serves"], null)}</dd>
						<dt>Active Time</dt>
						<dd>${entry.getIn(["data", "meta", "active"], null)}</dd>
						<dt>Total Time</dt>
						<dd>${entry.getIn(["data", "meta", "total"], null)}</dd>
					</dl>
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

				${ related }
			</div>

			<h3 class="article-hed jump-hed" id="recipe"><span>Recipe:</span>${entry.getIn(["data", "subhed"], null)}</h3>
			<p class="lede p-summary">${entry.getIn(["data", "notes"], null)}</p>

			${ ingredients }

			${ instructions }

		</main>`;
	}
});

export default Recipe;