const fetch = require( 'node-fetch' );

exports.handler = function(event, context, callback) {
  const params = event.queryStringParameters;
  const query = params['q'];

  if( !params /* || event.httpMethod !== 'POST' */ ) {
    return;
  }

  function search(){
    return fetch( `https://mystifying-poitras-33e02f.netlify.app/posts.json` )
      .then( res => res.json() )
      .then( json => {
        let ret = []
        json.posts.forEach( post => {
          if( post.title.search( new RegExp( query, "i" ) ) > -1 ) {
            if( post.type == "recipe" || post.type == "article" ) {
              ret.push([ post.title, post.url ]);
            }
          }
        });

        callback(null, {
          statusCode: 200,
          body: `Query was: ${ query }. Results are ${ ret }`
        });
      })
      .catch(err => {
        callback(null, {
          statusCode: 200,
          body: `I am Error: ${ err }. Query was: ${ query }.`
        });
      })
    }

  search();
};