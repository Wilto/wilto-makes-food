const fetch = require( 'node-fetch' );
const querystring = require( 'querystring' );

exports.handler = function(event, context, callback) {
  const postData = querystring.parse( event.body );
  const query = postData['q'];

  if (!postData || event.httpMethod !== 'POST' ) {
    return {
      statusCode: 400,
      body: 'You are not using a http POST method for this endpoint.',
      headers: {
        'Allow': 'POST'
      }
    }
  }

  function search(){
    return fetch( `https://mystifying-poitras-33e02f.netlify.app/posts.json` )
      .then( res => res.json() )
      .then( json => {
        let ret = [];
        json.forEach( post => {
          if( post.title.search( new RegExp( query, "i" ) ) > -1 ) {
            ret.push({ "title" : post.title });
          }
        });

        callback(null, {
          statusCode: 200,
          body: `${ JSON.stringify( postData }`
        });
      })
      .catch(err => {
        callback(null, {
          statusCode: 200,
          body: `I am Error: ${ err }. Query was: ${ postData  }.`
        });
      })
    }

  search();
};