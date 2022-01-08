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
  const res = http.get('http://localhost:3000/products');
  check(res, {
    'GET /products status is status 200': (r) => r.status === 200,
  });

  sleep(0.5);
}
