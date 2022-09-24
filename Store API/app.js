require("dotenv").config();

// This helps us catch async errors so we wont need to use try catch in controllers to catch errors
require("express-async-errors");

const express = require("express");
const connectDB = require("./db/connect");
const app = express();
const port = process.env.PORT || 3000;

const products = require("./routes/products");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`<h1>Store API</h1><a href="/api/v1/products">Products</a>`);
});

app.use("/api/v1/products", products);

app.use(notFoundMiddleware);
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
