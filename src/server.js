const http = require('http'); // http module
const url = require('url'); // url module
const query = require('querystring'); // query string module
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// function to handle requests
const onRequest = (request, response) => {
  // parse url into individual parts
  // returns an object of url parts by name
  const parsedUrl = url.parse(request.url);

  // key:value object to look up URL routes to specific functions
  // const urlStruct = {
  //   // "/": htmlHandler.getIndex,
  //   // "/success": jsonHandler.success,
  //   "/badRequest": jsonHandler.badRequest,
  //   notFound: jsonHandler.notFound
  // };

  // grab the query parameters (?key=value&key2=value2&etc=etc)
  // and parse them into a reusable object by field name
  const params = query.parse(parsedUrl.query);

  // check if the path name (the /name part of the url) matches
  // any in our url object. If so call that function. If not, default to index.
  // if (urlStruct[parsedUrl.pathname]) {
  //   urlStruct[parsedUrl.pathname](request, response, params);
  // } else {
  //   urlStruct.notFound(request, response, params);
  // }

  // check the request method seeing application/json or text/xml
  switch (request.method) {
    case 'GET':
      if (parsedUrl.pathname === '/') {
        // if homepage, send index
        htmlHandler.getIndex(request, response);
      } else if (parsedUrl.pathname === '/style.css') {
        // if stylesheet, send stylesheet
        htmlHandler.getCSS(request, response);
      } else if (parsedUrl.pathname === '/getUsers') {
        // if get users, send user object back
        jsonHandler.getUsers(request, response);
      } else if (parsedUrl.pathname === '/updateUser') {
        // if update user, change our user object
        jsonHandler.updateUser(request, response);
      } else if (parsedUrl.pathname === '/success') {
        // if success is selected
        jsonHandler.getSuccess(request, response);
      } else if (parsedUrl.pathname === '/badRequest') {
        // if success is selected
        console.log(params);
        jsonHandler.getBadRequest(request, response, params);
      } else if (parsedUrl.pathname === '/unauthorized') {
        // if success is selected
        console.log(params);
        jsonHandler.getUnauthorized(request, response, params);
      } else if (parsedUrl.pathname === '/forbidden') {
        // if success is selected
        jsonHandler.getForbidden(request, response);
      } else if (parsedUrl.pathname === '/internal') {
        // if success is selected
        jsonHandler.getInternal(request, response);
      } else if (parsedUrl.pathname === '/notImplemented') {
        // if success is selected
        jsonHandler.getNotImplemented(request, response);
      } else {
        // if not found, send 404 message
        jsonHandler.notFound(request, response);
      }
      break;
    case 'HEAD':
      if (parsedUrl.pathname === '/getUsers') {
        // if get users, send meta data back
        jsonHandler.getUsersMeta(request, response);
      } else {
        // if not found send 404 without body
        jsonHandler.notFoundMeta(request, response);
      }
      break;
    default:
      // send 404 in any other case
      jsonHandler.notFound(request, response);
  }
};

// start server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
