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

// eslint-disable-next-line import/extensions
const {
  getProducts, getStylesWithPhotosAndSkus, getProductsWithSupressedFeatures,
} = require('../db/db.js');

const app = express();
app.use(express.static('Public'));

app.get("/loaderio-1592abcdd1d200cc43f378b33cc5497b.txt", (req, res, next) => {
  const options = {
    root: path.join(__dirname),
  };

  const fileName = "loaderio-1592abcdd1d200cc43f378b33cc5497b";
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
