const { base } = require("../models/product");
const Product = require("../models/product");

const getProductsStatic = async (req, res) => {
  const products = await Product.find({}).sort("name").sort("price");
  res.status(200).json({ nbHits: products.length, products });
};

const getProducts = async (req, res) => {
  const { name, featured, company, price, sort, fields, numericFilters } =
    req.query;

  const queryObj = {};

  if (featured) {
    queryObj.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObj.company = company;
  }

  if (name) {
    queryObj.name = {
      $regex: name,
      $options: "i",
    };
  }

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const regex = /\b(<|>|>=|<=|=)\b/g;
    let filters = numericFilters.replace(regex, (match) => {
      return `-${operatorMap[match]}-`;
    });

    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObj[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObj);
  let products;

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  products = await result;

  if (products.length < 1) {
    return res.status(404).json({ msg: "No product found" });
  }

  res.status(200).json({ nbHits: products.length, products });
};

module.exports = { getProductsStatic, getProducts };
