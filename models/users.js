module.exports = function(sequelize, DataTypes) {
  var Person = sequelize.define("users", {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    login_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    responses: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    is_student: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  return Person;
};
