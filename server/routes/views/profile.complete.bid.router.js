const express = require('express')
const router = express.Router()
const { Bid } = require('../../db/models');

router.get("/", async (req,res)=>{
  const {userId} = req.query;

  try {
    const bidsDB = await Bid.findAll({where:{author_id: userId, status: 'complete'}});
    if(bidsDB){
      const bids = JSON.parse(JSON.stringify(bidsDB));
      res.json(bids)
    }else{
      res.status(403).json({ message: 'not authorized'})
    }

  } catch (error) {
    console.log('message', error.message);
    res.status(404).json({ message: 'catch error!'})
  }
})

module.exports = router;