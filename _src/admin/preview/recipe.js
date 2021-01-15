import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

// Preview component for a Page
const Recipe = createClass({
	render() {
		const {entry, fieldsMetaData} = this.props;

		// Image
		const image = entry.getIn([ 'data', 'feat_img', 'img' ], null );
		const img = this.props.getAsset( image );
		const alt = entry.getIn([ 'data', 'feat_img', 'alt' ], null );
		let imgEl = h('img', {
			src: img.toString(),
			alt: alt
		});

		let ret = [];
		const rMeta = fieldsMetaData.getIn([ 'related' ], null ) || [];

		rMeta && rMeta.forEach( r => {
			let title = Object.keys( r.toJS() )[ 0 ],
				fullMeta = r.get( title );

			ret.push(
				h( 'div', { className: 'related' }, 
					h( 'a', { href: '#' }, title ),
					h( 'p', {}, fullMeta.get( 'subhed' ) )
				)
			)
		});

		console.log( ret.length );
		let related = h( 'div', { className: 'related' }, 
				h( 'h3', { className: 'subhed' }, "Related Article" + ( ret.length > 1 ? "s" : "" ),
				ret
			)
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
					<p class="alt-overlay">alt: ${ alt }</p>
					${ imgEl }
					<figcaption class="caption">
						${ entry.getIn([ 'data', 'feat_img', 'capt' ], null ) }
					</figcaption>
				</figure>
				<div className="lede">${this.props.widgetFor("lede")}</div>
				${this.props.widgetFor("body")}
			</div>
			${ related }
			<h3 class="article-hed jump-hed" id="recipe"><span>Recipe:</span>${entry.getIn(["data", "subhed"], null)}</h3>
			<p class="lede p-summary">${entry.getIn(["data", "notes"], null)}</p>

			${ ingredients }

			${ instructions }

		</main>`;
	}
});

export default Recipe;