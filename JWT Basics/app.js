require("dotenv").config();
require("express-async-errors");

const express = require("express");
const mainRouter = require("./routes/main");

const app = express();
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1", mainRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening at http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
