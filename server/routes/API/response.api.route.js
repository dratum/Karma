const express = require("express");
const router = express.Router();
const { Response, Room, User } = require("../../db/models");

router
  .post("/responses", async (req, res) => {
    const { user_id, bid_id, author_id, title } = req.body;
    try {
      const newResponse = await Response.create({ user_id, bid_id });
      const newRoom = await Room.create({
        user_id,
        bid_id,
        room_id: newResponse.id,
        title,
      });
      const newUserRoom = await Room.create({
        user_id: author_id,
        bid_id,
        room_id: newResponse.id,
        title,
      });
      if (newResponse) {
        res.status(201).json({ text: "Запись в Response успешно создана" });
      } else {
        res.status(403).json({ text: "Нет данных" });
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Didn't created Response!" });
    }
  })
  .delete("/responses/complete", async (req, res) => {
    const { user_id, bid_id } = req.body;

    try {
      const userId = await Response.findOne({ where: { bid_id } });
      const currUser = await User.findOne({ where: { id: userId.user_id } });
      //TODO можно ли эти запросы упростить?
      await currUser.update({ scores: currUser.scores + 25 });
      await Room.destroy({ where: { bid_id } });
      await Response.destroy({ where: { bid_id } });
      res.status(201).json({ message: "deleted response" });
    } catch (e) {
      console.log(e.message);
    }
  });

module.exports = router;
