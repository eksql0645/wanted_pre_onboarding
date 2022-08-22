const express = require('express');
const app = express();
const morgan = require('morgan');
const recruitmentRouter = require('./routers/recruitment-router');

// 개발용 로그 출력
app.use(morgan('dev'));

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/recruitments', recruitmentRouter);

// 에러 미들웨어
app.use((err, req, res, next) => {
  console.log('\x1b[33m%s\x1b[0m', err.stack);
  res.status(400).json({ result: 'error', reason: err.message });
});

module.exports = app;
