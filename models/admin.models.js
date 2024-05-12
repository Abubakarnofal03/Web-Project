const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config")



//------create table with feilds--------
const Admin = sequelize.define("admin", {
    AdminID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    }

});


module.exports = Admin




