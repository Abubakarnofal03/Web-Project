const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config")



//------create table with feilds--------
const Feedbacks = sequelize.define("Feedbacks", {
    Email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    feedback: {
        type: DataTypes.STRING,
        allowNull: false
    }

});


module.exports = Feedbacks




