// Adding all products in products.json to db
const connectDB = require("./db/connect");
const Product = require("./models/product");
const productsJson = require("./products.json");

async function connect() {
  try {
    connectDB().then(() => console.log("Connected to the db"));
    await Product.deleteMany();
    await Product.create(productsJson);
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

connect();
