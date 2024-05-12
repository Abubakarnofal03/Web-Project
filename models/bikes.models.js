const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config")

const Bikes = sequelize.define("bikes", {
    bikeName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    picture:{
      type: DataTypes.STRING,
      allowNull: false
    },
    phonenumber:{
      type:DataTypes.INTEGER,
      allowNull: false
    }

 });

module.exports = Bikes


