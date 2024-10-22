const express = require("express");
const router = express.Router();
const { User, Response } = require("../../db/models");

router.get("/names-exec", async (req, res) => {
  const { bidId } = req.query;
  // console.log(bidId);
  try {
    const execId = await Response.findOne({ where: { bid_id: bidId } });
    const currExec = await User.findOne({where: {id: execId.user_id}});
    if (currExec) {
      res.status(201).json(currExec.fio);
    } else {
      res.status(201).json('заглушка');
    }

  } catch (e) {
    res.send(e.message);
    console.log(e.message);
  }
});

module.exports = router;
