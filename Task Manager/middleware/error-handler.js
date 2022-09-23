const { CustomAPIError } = require("../Errors/custom-error");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.status).json({ error: err.message });
  }
  return res.status(500).json({ msg: err });
};

module.exports = errorHandlerMiddleware;
