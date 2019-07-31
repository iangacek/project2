module.exports = function(sequelize, DataTypes) {
  var Description = sequelize.define("Description", {
    chore: DataTypes.STRING,
    descText: DataTypes.TEXT
  });
  return Description;
};
