const querystring = require('querystring');

exports.handler = function(event, context, callback) {
  const post = querystring.parse(event.body);

  const email = post['email'],
    conf = post['conf'],
    url = post['url'],
    loc = post['loc'],
    dates = post['dates'],
    desc = post['desc'],
    coc = post['coc'];

  if (!post || event.httpMethod !== 'POST') {
    //return;
  }

  callback(null, {
    statusCode: 200,
    body: `Message sent!`
  });
};
