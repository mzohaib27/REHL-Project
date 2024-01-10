exports.errorHandler = (statusCode, message, next) => {
  const error = new Error(message);
  error.statusCode = statusCode;

  // return
  return error;
};
