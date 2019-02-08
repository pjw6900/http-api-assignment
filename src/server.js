const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  const acceptedTypes = request.headers.accept.split(',');

  const params = query.parse(parsedUrl.query);

  switch (parsedUrl.pathname) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/style.css':
      htmlHandler.getCSS(request, response);
      break;
    case '/success':
      jsonHandler.success(request, response, acceptedTypes);
      break;
    case '/badRequest':
      jsonHandler.badRequest(request, response, params, acceptedTypes);
      break;
    case '/unauthorized':
      jsonHandler.unauthorized(request, response, params, acceptedTypes);
      break;
    case '/forbidden':
      jsonHandler.forbidden(request, response, acceptedTypes);
      break;
    case '/internal':
      jsonHandler.internal(request, response, acceptedTypes);
      break;
    case '/notImplemented':
      jsonHandler.notImplemented(request, response, acceptedTypes);
      break;
    case '/notFound':
      jsonHandler.notFound(request, response, acceptedTypes);
      break;
    default:
      jsonHandler.notFound(request, response, acceptedTypes);
      break;
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
