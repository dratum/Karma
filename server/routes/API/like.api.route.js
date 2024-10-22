const express = require('express');
const router = express.Router();
const {Like} = require('../../db/models/')

router.post('/bids/:id/like', async (req, res) => {
  const {user_id, bid_id} = req.body;
  console.log(user_id, bid_id)
  try {
    const prevLike = await Like.findOne({where: {user_id: Number(user_id), bids_id: bid_id}})
    if (prevLike) {
      res.status(403).json({message: 'something wrong!'})
    } else {
      const newLike = await Like.create({user_id, bids_id: bid_id})
      if (newLike) {
        res.status(201).json(newLike)
      }
    }
  } catch (e) {
    console.log(e)
    res.status(400).json({message: "Didn't created like!"});
  }
})
  .delete('/bids/:id/like', async (req, res) => {
      const {user_id, bids_id} = req.body;
      console.log(user_id, bids_id)

      const prevLike = await Like.findOne({where: {user_id: Number(user_id), bids_id}})
      if (prevLike) {
        const unlike = await Like.destroy({where: {user_id: Number(user_id), bids_id}})
        if (unlike) {
          res.status(201).json({user_id, bids_id})
        } else {
          res.status(401).json({message: 'something wrong unlike!'})
        }
      }
    }
  )


module.exports = router