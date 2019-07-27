module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    Name: DataTypes.STRING,
    Point_Balance: DataTypes.INTEGER
  });
  



  return Users;

};
