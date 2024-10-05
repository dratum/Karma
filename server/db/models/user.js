'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Bid, Response, Token, Message, Room }) {
      this.hasMany(Bid, { foreignKey: 'author_id' })
      this.hasMany(Response, { foreignKey: 'user_id' })
      this.belongsToMany(Bid, {
        foreignKey: 'user_id',
        through: 'Likes'
      })
      this.hasOne(Token, {
        foreignKey: 'user_id'
      })
      this.hasMany(Room, {foreignKey: 'user_id'})
      this.hasMany(Message, {foreignKey: 'user_id'})
    }
  }
  User.init({
    fio: DataTypes.STRING,
    date_of_birth: DataTypes.DATEONLY,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    isActivated: DataTypes.BOOLEAN,
    activationLink: DataTypes.STRING,
    scores: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};