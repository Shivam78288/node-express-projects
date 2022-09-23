const express = require("express");
const connectDB = require("./db/connect");
const tasks = require("./routes/tasks");
const port = process.env.PORT || 3000;
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
require("dotenv").config();

const app = new express();

app.use(express.json());
app.use(express.static("./public"));
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

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
