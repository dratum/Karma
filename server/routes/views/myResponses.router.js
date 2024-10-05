const express = require('express');
const router = express.Router();
const {Response, Bid} = require('../../db/models')

module.exports = router.get('/my-responses', async (req, res) => {
  const {userId} = req.query
  try {
    const bidsIds = await Response.findAll({where: {user_id: userId}, raw: true});
    const Responses = await Bid.findAll({where: {id: bidsIds.map(bidId => bidId.bid_id)}, raw: true})
    res.status(201).json(Responses)
  } catch (e) {
    console.log({e})
  }
})