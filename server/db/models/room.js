'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Bid, Response}) {
      this.belongsTo(User, {foreignKey: 'id'})
      this.belongsTo(Bid, {foreignKey: 'id'})
      this.belongsTo(Response, {foreignKey: 'id'})
      // define association here
    }
  }
  Room.init({
    user_id: DataTypes.INTEGER,
    bid_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};