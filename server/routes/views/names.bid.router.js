const express = require('express');
const router = express.Router();
const {User} = require('../../db/models')

router.get('/names-customers', async (req, res) => {
  const {authorId} = req.query;
 
  try{
    const author = await User.findByPk(authorId)
    console.log(author.fio)
    res.status(201).json(author.fio)
  } catch (e){
    res.send(e.message)
    console.log(e.message)
  }

})

module.exports = router;