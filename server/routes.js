/* eslint-disable no-console */
/* eslint-disable no-var */
// eslint-disable-next-line import/extensions

// create a basic express server on port 3000
const express = require('express');

// eslint-disable-next-line import/extensions
const { getProducts } = require('../db/db.js');

const app = express();
app.use(express.static('Public'));

app.get('/products', (req, res) => {
  getProducts()
    .then((products) => {
      res.send(products);
    });
});

app.get('/products/:product_id', (req, res) => {


});

app.get('/products/:product_id/styles', (req, res) => {

});
app.listen(3000, () => {
  console.log('listening on port 3000');
});
