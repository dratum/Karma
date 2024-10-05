const express = require('express');
const router = express.Router();
const {User} = require('../../db/models');

router.post('/date', async (req, res) => {
  const {fio, email, phone, userId} = req.body;
  try {
    const userDB = await User.findOne({where:{id: userId}})
    // console.log(req.body)
    if(userDB){
        const userDBUpdate = await userDB.update({fio, email, phone})
        res.status(200).json({text: 'successful!'})
    }else{
        res.status(500).json({ message: 'err_finding_user'})
    }
    
  } catch (e) {
    console.log(e)
    res.status(400).json({message: "Didn't created bid!"});
  }

})

module.exports = router;