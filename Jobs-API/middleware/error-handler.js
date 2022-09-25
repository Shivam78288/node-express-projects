const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong. Try again later",
  };

  // Handling error for duplicate email id on register user
  if (err.name === "ValidationError") {
    customError.status = StatusCodes.BAD_REQUEST;
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }

  // Handling cast error for invalid ObjectId on mongoose
  if (err.name === "CastError") {
    customError.status = StatusCodes.NOT_FOUND;
    customError.msg = `No item found for the id: ${err.value}`;
  }

  // Handling validation error coming from Mongoose
  if (err.code && err.code === 11000) {
    customError.status = StatusCodes.BAD_REQUEST;
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field. Please choose another value`;
  }

  return res.status(customError.status).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
