module.exports = function(sequelize, DataTypes) {

  
  
    var Tasks = sequelize.define("Tasks", {
      Description: DataTypes.STRING,
      Point_Value: DataTypes.INTEGER,
      Room: DataTypes.STRING,
    });
    return Tasks;
  
  };
  