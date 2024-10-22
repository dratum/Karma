const express = require('express');
const router = express.Router();
const {Bid} = require('../../db/models');

router.put("/bids/:id", async (req, res) => {
  const bidId = req.params.id;
  const {status} = req.body
  console.log(status)
try{
  const bid = await Bid.findByPk(bidId);
  const currentBid = await Bid.findOne({where: {id: bid.id}});
  const changeStatusBid = await currentBid.update({status})
  if (changeStatusBid.status === 'response') {
    res.status(200).json({text: 'successful!'})
  } else {
    await currentBid.update({status})
    res.status(200).json({message: 'again create!'});
  }
} catch (e) {
  console.log(e)
  res.status(400).json({message: "Didn't update bid!"});
}

})

module.exports = router;