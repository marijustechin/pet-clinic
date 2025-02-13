const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('appointment', {
    pet_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Gyvūno vardas privalomas',
        },
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Nepatvirtintas',
    },
    rating: {
      type: DataTypes.SMALLINT,
      defaultValue: 0,
    },
  });
};
