const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("appointment", {
    pet_name: {
      type: DataTypes.FLOAT,
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
  });
};
