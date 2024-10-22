'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Room}) {
      this.belongsTo(User, {foreignKey: 'id'})
      // define association here
    }
  }
  Message.init({
    room_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    text_message: DataTypes.STRING,
    is_read: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};