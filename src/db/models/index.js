const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Recruitment = require('./recruitment');
const Company = require('./company');
const Applicant = require('./applicant');

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Company = Company;
db.Recruitment = Recruitment;
db.Applicant = Applicant;

User.init(sequelize);
Company.init(sequelize);
Recruitment.init(sequelize);
Applicant.init(sequelize);

User.associate(db);
Company.associate(db);
Recruitment.associate(db);
Applicant.associate(db);

module.exports = db;
