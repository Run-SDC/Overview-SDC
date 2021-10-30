/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const db = mongoose.createConnection('mongodb://localhost/overview');

const product = new Schema({
  id: String,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
}, { collection: 'product' });

const feature = new Schema({
  id: String,
  product_id: String,
  feature: String,
  value: String,
}, { collection: 'features' });

const photo = new Schema({
  id: String,
  styleId: String,
  url: String,
  thumbnail_url: String,
}, { collection: 'photos' });

const sku = new Schema({
  id: String,
  styleId: String,
  size: String,
  quantity: String,
}, { collection: 'skus' });

const style = new Schema({
  id: String,
  productId: String,
  name: String,
  sale_price: String,
  original_price: String,
  default_style: String,
}, { collection: 'styles' });

const Product = db.model('Product', product);
const Style = db.model('Style', style);
const Sku = db.model('Sku', sku);
const Photo = db.model('Photo', photo);
const Feature = db.model('Feature', feature);

// make a query to all products with an optional id parameter
const getProducts = (id, count = 5) => {
  // if id is not provided, return all products and dont include _id
  if (!id) {
    // find all products
    return Product.find({}, { _id: 0 }).limit(count).exec();
  }
  return Product.find({ id }, { _id: 0 }).limit(count).exec();
};

module.exports = {
  getProducts,
};
