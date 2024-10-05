const express = require("express");
const router = express.Router();
const { Response } = require("../../db/models");

module.exports = router.get("/id-for-chatroom", async (req, res) => {
  const { id } = req.query;
  console.log(id);
  try {
    const responseId = await Response.findOne({
      where: { bid_id: id },
      raw: true,
    });
    console.log(responseId.id);
    res.status(201).json(responseId.id);
  } catch (e) {
    console.log({ e });
  }
});
