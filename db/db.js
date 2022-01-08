/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.connect('mongodb://localhost:27017/overview');

const products = mongoose.Schema({
  id: String,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
}, { collection: 'product' });

const Product = mongoose.model('products', products);

const features = mongoose.Schema({
  id: String,
  product_id: String,
  feature: String,
  value: String,
}, { collection: 'features' });

const Feature = mongoose.model('features', features);

const styles = mongoose.Schema({
  id: String,
  productId: String,
  name: String,
  sale_price: String,
  original_price: String,
  default_style: String,
}, { collection: 'styles' });

const Style = mongoose.model('styles', styles);

const photos = mongoose.Schema({
  id: String,
  styleId: String,
  url: String,
  thumbnail_url: String,
});

const Photo = mongoose.model('photos', photos);

const skus = mongoose.Schema({
  id: String,
  styleId: String,
  size: String,
  quantity: String,
}, { collection: 'skus' });

const Sku = mongoose.model('skus', skus);

const styleswithphotosandskus = mongoose.Schema({
  id: String,
  productId: String,
  name: String,
  sale_price: String,
  original_price: String,
  'default?': String,
  photos: [photos],
  skus: {
    type: Map,
    of: skus,
  },
}, { collection: 'styleswithphtosandskus' });

const StylesWithPhotosAndSkus = mongoose.model('styleswithphotosandskus', styleswithphotosandskus);

const productinfo = mongoose.Schema({
  id: String,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: [features],
}, { collection: 'productinfo' });

const ProductInformation = mongoose.model('productinfo', productinfo);

const getProductsWithSupressedFeatures = (count = 5) => ProductInformation.find({}, { _id: 0, features: 0 }).limit(count).exec();

const getProducts = (id, count = 5) => {
  // if id is not provided, return all products and dont include _id
  if (!id) {
    // find all products
    return getProductsWithSupressedFeatures(count);
  }
  return ProductInformation.find({ product_id: id }, { _id: 0 }).limit(count).exec();
};

const getStylesWithPhotosAndSkus = (Id) => StylesWithPhotosAndSkus.find({ productId: Id }, { _id: 0 }).exec();

// getStylesWithPhotosAndSkus('1').then((styles3) => {
//   console.log(styles3);
// });

module.exports = {
  getProducts,
  getStylesWithPhotosAndSkus,
  getProductsWithSupressedFeatures,
};
