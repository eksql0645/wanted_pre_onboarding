const Sequelize = require('sequelize');

module.exports = class Recruitment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        company_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        position: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        compensation: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        stack: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Recruitment',
        tableName: 'recruitments_tb',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.Recruitment.belongsTo(db.Company, {
      foreignKey: 'company_id',
      targetKey: 'id',
    });
  }
};
