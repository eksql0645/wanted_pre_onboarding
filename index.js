const app = require('./src/app.js');
const dotenv = require('dotenv');
const { sequelize } = require('./src/db/models');

dotenv.config();

const PORT = process.env.PORT || '포트 번호를 설정하세요.';

// db 연결 객체인 sequelize로 MySQL과 연동
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
    // db 연결 후 서버 연결
    app.listen(PORT, () => {
      console.log(`Server is running ${PORT} port`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
