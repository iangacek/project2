module.exports = function(sequelize, DataTypes) {

    var Chore = sequelize.define("Chore", {
        name: DataTypes.STRING,
        chore: DataTypes.STRING,
        day: DataTypes.STRING,
    });
    return Chore;

};