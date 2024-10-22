const express = require('express');
const router = express.Router();
const {Bid} = require('../../db/models');

router.post('/bids', async (req, res) => {
  const {title, description, address} = req.body;
  const { userId } = req.query;
  
  try {
      const newBid = await Bid.create({
      title,
      description,
      address,
      status: 'create',
      author_id: userId
    });
    if (newBid) {
      res.status(201).json({title, description, address});
    } else {
      res.status(403).json({message: 'didnt create new Bid'})
    }
  } catch (e) {
    console.log(e)
    res.status(400).json({message: "Didn't created bid!"});
  }

})

module.exports = router;