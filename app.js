const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

const PORT = process.env.PORT || '포트 번호를 설정하세요.';

// 개발용 로그 출력
app.use(morgan('dev'));

// 에러 미들웨어
app.use((err, req, res, next) => {
  console.log('\x1b[33m%s\x1b[0m', err.stack);
});

app.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 대기 중`);
});

module.exports = app;
