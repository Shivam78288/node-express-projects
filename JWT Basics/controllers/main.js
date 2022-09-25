require("dotenv").config();
const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError("please provide email and password");
  }
  // For demo only
  const id = new Date().getTime();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const luckyNum = Math.floor(Math.random() * 100);

  // req.user coming from authMiddleware
  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNum}`,
  });
};

module.exports = {
  login,
  dashboard,
};
