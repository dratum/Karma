'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Response, Room }) {
      this.belongsTo(User, { foreignKey: 'id' })
      this.hasOne(Response, { foreignKey: 'bid_id'})
      this.belongsToMany(User, {
        foreignKey: 'bid_id',
        through: 'Likes'
      })
      this.hasMany(Room, {foreignKey: 'bid_id'})
      // define association here
    }
  }
  Bid.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    address: DataTypes.STRING,
    status: DataTypes.STRING,
    author_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bid',
  });
  return Bid;
};