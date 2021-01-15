exports.handler = function(event, context, callback) {
  const params = event.queryStringParameters;
  const query = params['q'];

  if( !params /* || event.httpMethod !== 'POST' */ ) {
    return;
  }

  callback(null, {
    statusCode: 200,
    body: `Params were ${ params }. Query was: ${ query }.`
  });
};
