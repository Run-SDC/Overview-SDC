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
const path = require('path');
const memjs = require('memjs');

const client = memjs.Client.create();
// eslint-disable-next-line import/extensions
const {
  getProducts, getStylesWithPhotosAndSkus, getProductsWithSupressedFeatures,
} = require('../db/db.js');

const app = express();
app.use(express.static('Public'));

app.get("/loaderio-ca850dd55bc29479fb6d4e83a3e646bf.txt", (req, res, next) => {
  const options = {
    root: path.join(__dirname),
  };

  const fileName = "loaderio-ca850dd55bc29479fb6d4e83a3e646bf.txt";
  res.sendFile(fileName, options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});
app.get('/products', (req, res) => {
  getProductsWithSupressedFeatures()
    .then((products) => {
      res.send(products).status(200);
    });
});

app.get('/products/:product_id', (req, res) => {
  // check if product_id is in memcached
  client.get(`product_${req.params.product_id}`, (err, value) => {
    if (err) {
      console.log(err);
    } else {
      res.send(value).status(200);
    }
  });
  getProducts(req.params.product_id)
    .then((product) => {
      client.set(`product_${req.params.product_id}`, JSON.stringify(product), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Product was added to memcached');
        }
      });
      res.send(product).status(200);
    });
});

app.get('/products/:product_id/styles', (req, res) => {
  const container = {
    product_id: req.params.product_id,
    results: [],
  };
  client.get(`product_${req.params.product_id}/styles`, (err, value) => {
    if (err) {
      console.log(err);
    } else {
      container.results.push(value);
      res.send(container).status(200);
    }
  });
  getStylesWithPhotosAndSkus(req.params.product_id)
    .then((styles) => {
      client.set(`product_${req.params.product_id}`, JSON.stringify(styles), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Product was added to memcached');
        }
      });
      container.results.push(styles);
      // console.log('container: ', container.results[0]);
      res.send(container).status(200);
    });
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
