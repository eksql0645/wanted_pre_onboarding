const app = require('./src/app.js');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || '포트 번호를 설정하세요.';

app.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 대기 중`);
});
