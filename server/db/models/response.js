'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Response extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Bid, Room}) {
      this.belongsTo(User, { foreignKey: 'id'})
      this.belongsTo(Bid, { foreignKey: 'id'})
      this.hasMany(Room, {foreignKey: 'room_id'})
      // define association here
    }
  }
  Response.init({
    user_id: DataTypes.INTEGER,
    bid_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Response',
  });
  return Response;
};