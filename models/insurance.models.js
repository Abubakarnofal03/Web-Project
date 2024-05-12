
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config")

//------create table with feilds--------
const Insurance = sequelize.define("insurance", {
    companyName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

});

module.exports = Insurance


