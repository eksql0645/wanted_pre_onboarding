const Sequelize = require('sequelize');

module.exports = class Company extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        company_name: {
          type: Sequelize.STRING(15),
          allowNull: false,
          unique: true,
        },
        nation: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        city: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        company_address: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        company_introduction: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        company_email: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        company_contact: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Company',
        tableName: 'companies_tb',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.Company.hasMany(db.Recruitment, {
      foreignKey: 'company_id',
      suorceKey: 'id',
    });
  }
};
