module.exports = function(sequelize, DataTypes) {
  var Description = sequelize.define("Description", {
    chore: DataTypes.STRING,
    Description: DataTypes.STRING
  });
  return Description;
};
