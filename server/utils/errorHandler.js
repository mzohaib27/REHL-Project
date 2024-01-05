exports.errorHandler = (statusCode, message, next) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  // return
  return next(error);
};
