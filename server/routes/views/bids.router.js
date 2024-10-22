const express = require('express');
const router = express.Router();
const {Bid, User} = require('../../db/models')
const {Op} = require("sequelize");

router.get('/bids', async (req, res) => {
  const {userId} = req.query;
 
  const bids = await Bid.findAll({
    where: {
      status: 'create', author_id: {
        [Op.ne]: userId
      }
    }, raw: true
  });
  res.status(200).json(bids);
})

router.get('/all-bids', async (req, res) => {

 
  const bidsFromDB = await Bid.findAll();
  const allBids = JSON.parse(JSON.stringify(bidsFromDB))
  res.status(200).json(allBids);
})

router.get('/bid/:id', async (req, res) => {
  const { id } = req.params
 
  const bidFromDB = await Bid.findByPk(Number(id));
  const bid = bidFromDB.get()
  const authorId = bid.author_id
  const authorFromDB = await User.findByPk(Number(authorId));
  const author = authorFromDB.get()
  res.status(200).json({ bid, author});
})

module.exports = router;
