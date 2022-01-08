/* eslint-disable no-loop-func */
/* eslint-disable vars-on-top */
/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable no-var */
// eslint-disable-next-line import/extensions

const express = require('express');

// eslint-disable-next-line import/extensions
const {
  getProducts, getStylesWithPhotosAndSkus, getProductsWithSupressedFeatures,
} = require('../db/db.js');

const app = express();
app.use(express.static('Public'));

app.get('/products', (req, res) => {
  getProductsWithSupressedFeatures()
    .then((products) => {
      res.send(products).status(200);
    });
});

app.get('/products/:product_id', (req, res) => {
  getProducts(req.params.product_id)
    .then((product) => {
      res.send(product).status(200);
    });
});

app.get('/products/:product_id/styles', (req, res) => {
  const container = {
    product_id: req.params.product_id,
    results: [],
  };
  getStylesWithPhotosAndSkus(req.params.product_id)
    .then((styles) => {
      container.results.push(styles);
      // console.log('container: ', container.results[0]);
      res.send(container).status(200);
    });
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
