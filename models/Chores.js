module.exports = function(sequelize, DataTypes) {
  var Chore = sequelize.define("Chores", {
    chore: DataTypes.STRING,
    description: DataTypes.STRING
  });
  return Chore;
};
