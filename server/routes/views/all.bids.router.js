const express = require('express');
const allBidsRouter = express.Router();
const {Bid} = require('../../db/models')


allBidsRouter.get('/all-bids', async (req, res) => {

 
  const bidsFromDB = await Bid.findAll();
  const allBids = JSON.parse(JSON.stringify(bidsFromDB))
  res.status(200).json(allBids);
})

module.exports = allBidsRouter;
