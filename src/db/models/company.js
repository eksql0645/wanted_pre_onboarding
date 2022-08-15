const Sequelize = require('sequelize');

module.exports = class Company extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        companyName: {
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
        companyAddress: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        companyIntroduction: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        companyEmail: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        companyContact: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.NOW,
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
      foreignKey: 'companyId',
      suorceKey: 'id',
    });
  }
};
