const express = require('express');
const router = express.Router();
const {Like} = require('../../db/models');

router.get('/likes', async (req, res) => {
  const likes = await Like.findAll({raw: true})
  res.status(200).json(likes);

})

module.exports = router;