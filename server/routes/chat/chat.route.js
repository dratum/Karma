const express = require('express');
const router = express.Router();
const {Message, Room, Bid} = require('../../db/models');
const {where, Sequelize} = require("sequelize");

router.get('/chat', async (req, res) => {
  const { userId } = req.query;
  try {
    const rooms = await Room.findAll({
      where: {
        user_id: userId
      }
    });
    console.log(rooms)
    res.status(200).json(rooms)
  } catch (error) {
    console.log('Ошибка при закгрузке комнат', error);
  }
})

router.get('/chat/:room_id', async (req, res) => {
  const {userId} = req.query;
  const room_id = req.params.room_id;
  try {
    const messages = await Message.findAll({where: { room_id }});
    res.status(200).json(messages);
  } catch (error) {
    console.log('Ошибка запроса', error);
  }
})

module.exports = router