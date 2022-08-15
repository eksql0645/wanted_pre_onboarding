const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

// 개발용 로그 출력const dotenv = require('dotenv');

app.use(morgan('dev'));

// 에러 미들웨어
app.use((err, req, res, next) => {
  console.log('\x1b[33m%s\x1b[0m', err.stack);
});

module.exports = app;
