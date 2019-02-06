// Note this object is purely in memory
// When node shuts down this will be cleared.
// Same when your heroku app shuts down from inactivity
// We will be working with databases in the next few weeks.
const users = {};

// function to respond with a json object
// takes request, response, status code and object to send
const respondJSON = (request, response, status, object) => {
  // object for our headers
  // Content-Type for json
  const headers = {
    "Content-Type": "application/json"
  };

  // send response with json object
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

// function to respond without json body
// takes request, response and status code
const respondJSONMeta = (request, response, status) => {
  // object for our headers
  // Content-Type for json
  const headers = {
    "Content-Type": "application/json"
  };

  // send response without json object, just headers
  response.writeHead(status, headers);
  response.end();
};

// get user object
// should calculate a 200
const getUsers = (request, response) => {
  // json object to send
  const responseJSON = {
    users
  };

  // return 200 with message
  return respondJSON(request, response, 200, responseJSON);
};

// get meta info about user object
// should calculate a 200
// return 200 without message, just the meta data
const getUsersMeta = (request, response) =>
  respondJSONMeta(request, response, 200);

// function just to update our object
const updateUser = (request, response) => {
  // change to make to user
  // This is just a dummy object for example
  const newUser = {
    createdAt: Date.now()
  };

  // modifying our dummy object
  // just indexing by time for now
  users[newUser.createdAt] = newUser;

  // return a 201 created status
  return respondJSON(request, response, 201, newUser);
};

// function for 404 not found requests with message
const notFound = (request, response) => {
  // create error message for response
  const responseJSON = {
    message: "The page you are looking for was not found.",
    id: "notFound"
  };

  // return a 404 with an error message
  respondJSON(request, response, 404, responseJSON);
};

// function for 404 not found without message
const notFoundMeta = (request, response) => {
  // return a 404 without an error message
  respondJSONMeta(request, response, 404);
};

const getSuccess = (request, response) => {
  // json message for response
  const responseJSON = {
    message: "This is a successful response",
    id: "success"
  };
  // return 200 with message
  return respondJSON(request, response, 200, responseJSON);
};

const getBadRequest = (request, response) => {
  // json message for response
  const responseJSON = {
    message: "Missing valid query parameter set to true",
    id: "badRequest"
  };
  // return 400 with message
  return respondJSON(request, response, 400, responseJSON);
};

const getUnauthorized = (request, response) => {
  // json message for response
  const responseJSON = {
    message: "Missing loggedIn query parameter set to yes",
    id: "Unauthorized"
  };
  // return 401 with message
  return respondJSON(request, response, 401, responseJSON);
};

const getForbidden = (request, response) => {
  // json message for response
  const responseJSON = {
    message: "You do not have access to this content",
    id: "Forbidden"
  };
  // return 403 with message
  return respondJSON(request, response, 403, responseJSON);
};

const getInternal = (request, response) => {
  // json message for response
  const responseJSON = {
    message: "Internal Server Error. Something went wrong",
    id: "InternalError"
  };
  // return 500 with message
  return respondJSON(request, response, 500, responseJSON);
};

const getNotImplemented = (request, response) => {
  // json message for response
  const responseJSON = {
    message:
      "A get request for this page has not been implemented yet. Check again later for updated content",
    id: "notImplemented"
  };
  // return 501 with message
  return respondJSON(request, response, 501, responseJSON);
};

// set public modules
module.exports = {
  getUsers,
  getUsersMeta,
  updateUser,
  notFound,
  notFoundMeta,
  getSuccess,
  getBadRequest,
  getUnauthorized,
  getForbidden,
  getInternal,
  getNotImplemented
};
