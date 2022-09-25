const jwt = require("jsonwebtoken");
const { AuthorizationError } = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AuthorizationError("Token not provided or invalid");
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { username, id };
    next();
  } catch (err) {
    throw new AuthorizationError("Not authorized to access this route");
  }
};

module.exports = authenticationMiddleware;
