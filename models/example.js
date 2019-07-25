module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Users", {
    Name: DataTypes.STRING,
    Point_Balance: DataTypes.INTEGER
  });
  


  var Tasks = sequelize.define("Tasks", {
    Description: DataTypes.STRING,
    Point_Value: DataTypes.INTEGER,
    Room: DataTypes.STRING,
  });
  return Example, Tasks;

};
