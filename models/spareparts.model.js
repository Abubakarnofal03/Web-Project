const sequelize = require("../config")
const { Sequelize, DataTypes } = require("sequelize");


const spareParts = sequelize.define("spareParts", {
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    picePkr: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    typeOfPart: {
        type: DataTypes.STRING,
        allowNull: false
    },
    model: {
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


 module.exports = spareParts