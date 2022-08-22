const Sequelize = require('sequelize');

module.exports = class Applicant extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        applicant_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        recruitment_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Applicant',
        tableName: 'applicants_tb',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.Applicant.belongsTo(db.User, {
      foreignKey: 'applicant_id',
      targetKey: 'id',
    }),
      db.Applicant.belongsTo(db.Recruitment, {
        foreignKey: 'recruitment_id',
        targetKey: 'id',
      });
  }
};
