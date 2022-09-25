require("dotenv").config();
require("express-async-errors");

// Security Middlewares
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const jobsRouter = require("./routes/jobs");
const authRouter = require("./routes/auth");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authMiddleware = require("./middleware/authentication");

app.set("trust proxy", 1);
// Time = 15 mins and max requests in 15 mins = 100
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authMiddleware, jobsRouter);

// routes
app.get("/", (req, res) => {
  res.send("jobs api");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async function () {
  try {
    await connectDB().then(() => {
      console.log("Connection to DB successful");
    });

    app.listen(port, () => {
      console.log(`server is listening on http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

start();
