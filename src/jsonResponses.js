const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondXML = (request, response, status, content) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(content);
  response.end();
};

const createXML = (message, id = '') => {
  let responseXML = '<response>';

  responseXML = `${responseXML} <message>${message}</message>`;
  if (id !== '') { responseXML = `${responseXML} <id>${id}</id>`; }
  responseXML = `${responseXML} </response>`;

  return responseXML;
};

const success = (request, response, acceptedTypes = ['application/json']) => {
  if (acceptedTypes[0] === 'text/xml') {
    return respondXML(request, response, 200, createXML('success'));
  }

  const responseJSON = {
    message: 'This is a successful response',
  };

  return respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response, params, acceptedTypes = ['application/json']) => {
  if (acceptedTypes[0] === 'text/xml') {
    if (!params.valid || params.valid !== 'true') {
      return respondXML(request, response, 400, createXML('Missing valid query parameter or it is not set to True', 'badRequest'));
    }
    return respondXML(request, response, 200, createXML('This request has the required parameters'));
  }

  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter or it is not set to True';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

const unauthorized = (request, response, params, acceptedTypes = ['application/json']) => {
  if (acceptedTypes[0] === 'text/xml') {
    if (!params.loggedIn || params.loggedIn !== 'yes') {
      return respondXML(request, response, 401, createXML('This is an unauthorized request', 'unauthorizedRequest'));
    }
    return respondXML(request, response, 200, createXML('This is an authorized request'));
  }

  const responseJSON = {
    message: 'This is an authorized request',
  };

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'This is an unauthorized request';
    responseJSON.id = 'unauthorizedRequest';
    return respondJSON(request, response, 401, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

const forbidden = (request, response, acceptedTypes = ['application/json']) => {
  if (acceptedTypes[0] === 'text/xml') {
    return respondXML(request, response, 403, createXML('The page you are looking for is forbidden', 'forbidden'));
  }

  const responseJSON = {
    message: 'The page you are looking for is forbidden',
    id: 'forbidden',
  };

  return respondJSON(request, response, 403, responseJSON);
};

const internal = (request, response, acceptedTypes = ['application/json']) => {
  if (acceptedTypes[0] === 'text/xml') {
    return respondXML(request, response, 500, createXML('Internal Server Error', 'internal'));
  }

  const responseJSON = {
    message: 'Internal Server Error',
    id: 'internal',
  };

  return respondJSON(request, response, 500, responseJSON);
};

const notImplemented = (request, response, acceptedTypes = ['application/json']) => {
  if (acceptedTypes[0] === 'text/xml') {
    return respondXML(request, response, 501, createXML('Error code not implemented', 'notImplemented'));
  }

  const responseJSON = {
    message: 'Error code not implemented',
    id: 'notImplemented',
  };

  return respondJSON(request, response, 501, responseJSON);
};

const notFound = (request, response, acceptedTypes = ['application/json']) => {
  if (acceptedTypes[0] === 'text/xml') {
    return respondXML(request, response, 404, createXML('The page you are looking for was not found', 'notFound'));
  }

  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};


module.exports.success = success;
module.exports.badRequest = badRequest;
module.exports.unauthorized = unauthorized;
module.exports.forbidden = forbidden;
module.exports.internal = internal;
module.exports.notImplemented = notImplemented;
module.exports.notFound = notFound;
