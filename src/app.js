const express = require('express');
const app = express();
const morgan = require('morgan');
const recruitmentRouter = require('./routers/recruitment-router');

// 개발용 로그 출력
app.use(morgan('dev'));

app.use('/api/recruit', recruitmentRouter);

// 에러 미들웨어
app.use((err, req, res, next) => {
  console.log('\x1b[33m%s\x1b[0m', err.stack);
});

module.exports = app;
