import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

// Preview component for a Page
const Recipe = createClass({
  render() {
    const entry = this.props.entry;

    return html`
      <main>
      <div class="col" itemscope itemtype="http://schema.org/Recipe" class="h-recipe">
        <div class="intro">
          <h2 class="recipe-hed p-name" itemprop="name">${entry.getIn(["data", "title"], null)}{% if hq %}<svg class="hq" width="24" height="25" viewBox="0 0 324 329" version="1" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M44 223v-7a118 118 0 1 1 230 38v-5a96 96 0 1 0-153 77l5 3a167 167 0 1 1 197-221A153 153 0 0 0 44 223z" fill="#444" fill-rule="evenodd"/></svg>{% endif %}</h2>
          ${this.props.widgetFor("body")}
      </main>
    `;
  }
});

export default Recipe;