const express = require('express');
const router = express.Router();
const {Bid} = require('../../db/models')
const {up} = require("../../db/seeders/02-test-bids");

module.exports = router.delete('/profile/bids/:id', async (req, res) => {
  const {user_id, bid_id} = req.body
  try {
    const currentBid = await Bid.findByPk(bid_id);
    if (currentBid.author_id === +user_id) {
      await Bid.destroy({where: {id: currentBid.id}});
      res.status(200).end();
    } else {
      res.status(403).json({message: 'Not authorized'});
    }
  } catch (e) {
    console.log(e)
  }
})
  .put('/profile/bids/:id', async (req, res) => {
    const {
      id,
      title,
      description,
      address
    } = req.body;

    try {
      const currentBid = await Bid.findByPk(+id);
      if (currentBid) {
        const updateBid = await currentBid.update({title, description, address});
        res.status(201).json(updateBid);
      } else {
        res.status(403).json({message: 'didnt update new Bid'})
      }
    } catch (e) {
      console.log(e)
    }
  })