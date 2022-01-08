/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-absolute-path */
/* eslint-disable func-names */
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 1500 },
    { duration: '1m', target: 500 },
    { duration: '1m', target: 200 },
    { duration: '1m', target: 50 },
    { duration: '1m', target: 0 },
  ],
};

export default function () {
  const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const product_id = randomInteger(900000, 1000000);
  const res = http.get(`http://localhost:3000/products/${product_id}/styles/`);
  check(res, {
    'GET /products/:product_id/styles status is status 200': (r) => r.status === 200,
  });

  sleep(0.5);
}
