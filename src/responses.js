// function to respond with a json object
// takes request, response, status code and object to send
const respond = (request, response, status, object, type) => {
  // object for our headers
  // Content-Type for json
  const headers = {
    'Content-Type': type,
  };

  // send response with json object
  response.writeHead(status, headers);
  response.write(object);
  response.end();
};

// function for 404 not found requests with message
const getNotFound = (request, response, acceptedTypes) => {
  // create error message for response
  const respondNotFound = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // if xml respond xml
  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${
      respondNotFound.message
    }</message>`;
    responseXML = `${responseXML} <id>${respondNotFound.id}</id>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respond(request, response, 404, responseXML, 'text/xml');
  }

  const notFoundString = JSON.stringify(respondNotFound);

  // return a 404 with an error messagenotFound
  return respond(request, response, 404, notFoundString, 'application/json');
};

const getSuccess = (request, response, acceptedTypes) => {
  // json message for response
  const responseSucess = {
    message: 'This is a successful response',
  };

  // if xml respond xml
  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseSucess.message}</message>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const responseSucessString = JSON.stringify(responseSucess);

  // return 200 with message
  return respond(
    request,
    response,
    200,
    responseSucessString,
    'application/json',
  );
};

const getBadRequest = (request, response, params, acceptedTypes) => {
  // json message to send
  const responseBadRequest = {
    message: 'This request has the required parameters',
  };

  let statusCode = 200;
  let responseBadRequestString = JSON.stringify(responseBadRequest);

  // if the request does not contain a valid=true query parameter
  if (!params.valid || params.valid !== 'true') {
    // set our error message
    responseBadRequest.message = 'Missing valid query parameter set to true';
    // give the error a consistent id
    responseBadRequest.id = 'badRequest';

    responseBadRequestString = JSON.stringify(responseBadRequest);
    statusCode = 400;

    // if xml respond xml and 400
    if (acceptedTypes[0] === 'text/xml') {
      // create a valid XML string with name and age tags.
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${
        responseBadRequest.message
      }</message>`;
      responseXML = `${responseXML} <id>${responseBadRequest.id}</id>`;
      responseXML = `${responseXML} </response>`;

      // return response passing out string and content type
      return respond(request, response, statusCode, responseXML, 'text/xml');
    }
  }

  // if xml respond xml and 200
  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${
      responseBadRequest.message
    }</message>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respond(request, response, statusCode, responseXML, 'text/xml');
  }

  // if the parameter is here, send json with a success status code
  return respond(
    request,
    response,
    statusCode,
    responseBadRequestString,
    'application/json',
  );
};

const getUnauthorized = (request, response, params, acceptedTypes) => {
  // json message to send
  const respondUnauthorized = {
    message: 'This request has the required parameters',
  };

  let statusCode = 200;
  let responseUnauthorizedString = JSON.stringify(respondUnauthorized);

  // if the request does not contain a valid=true query parameter
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    // set our error message
    respondUnauthorized.message = 'Missing loggedIn query parameter set to yes';
    // give the error a consistent id
    respondUnauthorized.id = 'Unauthorized';

    responseUnauthorizedString = JSON.stringify(respondUnauthorized);
    statusCode = 401;

    // if xml respond xml and 401
    if (acceptedTypes[0] === 'text/xml') {
      // create a valid XML string with name and age tags.
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${
        respondUnauthorized.message
      }</message>`;
      responseXML = `${responseXML} <id>${respondUnauthorized.id}</id>`;
      responseXML = `${responseXML} </response>`;

      // return response passing out string and content type
      return respond(request, response, statusCode, responseXML, 'text/xml');
    }
  }

  // if xml respond xml and 200
  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${
      respondUnauthorized.message
    }</message>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respond(request, response, statusCode, responseXML, 'text/xml');
  }

  // if the parameter is here, send json with a success status code
  return respond(
    request,
    response,
    statusCode,
    responseUnauthorizedString,
    'application/json',
  );
};

const getForbidden = (request, response, acceptedTypes) => {
  // json message for response
  const respondForbidden = {
    message: 'You do not have access to this content',
    id: 'Forbidden',
  };

  // if xml respond xml
  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${
      respondForbidden.message
    }</message>`;
    responseXML = `${responseXML} <id>${respondForbidden.id}</id>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respond(request, response, 403, responseXML, 'text/xml');
  }

  const forbiddenString = JSON.stringify(respondForbidden);

  // return 403 with message
  return respond(request, response, 403, forbiddenString, 'application/json');
};

const getInternal = (request, response, acceptedTypes) => {
  // json message for response
  const respondInternal = {
    message: 'Internal Server Error. Something went wrong',
    id: 'InternalError',
  };

  // if xml respond xml
  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${
      respondInternal.message
    }</message>`;
    responseXML = `${responseXML} <id>${respondInternal.id}</id>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respond(request, response, 500, responseXML, 'text/xml');
  }

  const internalString = JSON.stringify(respondInternal);

  // return 500 with message
  return respond(request, response, 500, internalString, 'application/json');
};

const getNotImplemented = (request, response, acceptedTypes) => {
  // json message for response
  const respondNotImplemented = {
    message:
      'A get request for this page has not been implemented yet. Check again later for updated content',
    id: 'notImplemented',
  };

  // if xml respond xml
  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${
      respondNotImplemented.message
    }</message>`;
    responseXML = `${responseXML} <id>${respondNotImplemented.id}</id>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respond(request, response, 501, responseXML, 'text/xml');
  }

  const notImplementedString = JSON.stringify(respondNotImplemented);

  // return 501 with message
  return respond(
    request,
    response,
    501,
    notImplementedString,
    'application/json',
  );
};

// set public modules
module.exports = {
  getNotFound,
  getSuccess,
  getBadRequest,
  getUnauthorized,
  getForbidden,
  getInternal,
  getNotImplemented,
};
