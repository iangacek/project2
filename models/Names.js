module.exports = function(sequelize, DataTypes) {
    var Name = sequelize.define("Names", {
        name: DataTypes.STRING,
        // chore: DataTypes.STRING,
        // description: DataTypes.STRING,
        day: DataTypes.STRING
    });
    Name.associate = function(models) {
    Name.belongsTo(models.Chores, {
    });
  };
    return Name;
};