const http = require('http'); // http module
const url = require('url'); // url module
const query = require('querystring'); // query string module
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  index: htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': jsonHandler.getSuccess,
  '/badRequest': jsonHandler.getBadRequest,
  '/unauthorized': jsonHandler.getUnauthorized,
  '/forbidden': jsonHandler.getForbidden,
  '/internal': jsonHandler.getInternal,
  '/notImplemented': jsonHandler.getNotImplemented,
};

// function to handle requests
const onRequest = (request, response) => {
  // parse url into individual parts
  // returns an object of url parts by name
  const parsedUrl = url.parse(request.url);

  // grab the query parameters (?key=value&key2=value2&etc=etc)
  // and parse them into a reusable object by field name
  const params = query.parse(parsedUrl.query);

  const acceptedTypes = request.headers.accept.split(',');

  switch (request.method) {
    case 'GET':
      if (parsedUrl.pathname === '/') {
        // if homepage, send index
        htmlHandler.getIndex(request, response);
      } else if (parsedUrl.pathname === '/style.css') {
        // if stylesheet, send stylesheet
        htmlHandler.getCSS(request, response);
      } else if (parsedUrl.pathname === '/success') {
        // if success is selected
        urlStruct[parsedUrl.pathname](request, response, acceptedTypes);
      } else if (parsedUrl.pathname === '/badRequest') {
        // if success is selected
        urlStruct[parsedUrl.pathname](request, response, params, acceptedTypes);
      } else if (parsedUrl.pathname === '/unauthorized') {
        // if success is selected
        urlStruct[parsedUrl.pathname](request, response, params, acceptedTypes);
      } else if (parsedUrl.pathname === '/forbidden') {
        // if success is selected
        urlStruct[parsedUrl.pathname](request, response, acceptedTypes);
      } else if (parsedUrl.pathname === '/internal') {
        // if success is selected
        urlStruct[parsedUrl.pathname](request, response, acceptedTypes);
      } else if (parsedUrl.pathname === '/notImplemented') {
        // if success is selected
        urlStruct[parsedUrl.pathname](request, response, acceptedTypes);
      } else {
        // if not found, send 404 message
        jsonHandler.getNotFound(request, response, acceptedTypes);
      }
      break;
    default:
      // send 404 in any other case
      jsonHandler.getNotFound(request, response, acceptedTypes);
  }
};

// start server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
