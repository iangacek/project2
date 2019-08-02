module.exports = function(sequelize, DataTypes) {
    var Name = sequelize.define("Names", {
        name: DataTypes.STRING,
        // chore: DataTypes.STRING,
        // description: DataTypes.STRING,
        day: DataTypes.STRING
    });
    return Name;
};