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
          ret.push( post.title );
        });

        callback(null, {
          statusCode: 200,
          body: `Query was: ${ query }. JSON is ${ json }. Results are ${ results }`
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