const querystring = require('querystring');

exports.handler = function(event, context, callback) {
  const post = querystring.parse( event.body );
  const query = post['q'];

  if( !post || event.httpMethod !== 'GET' ) {
    return;
  }

  callback(null, {
    statusCode: 200,
    body: `Query was: ${ query }.`
  });
};
