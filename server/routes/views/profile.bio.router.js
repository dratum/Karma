const express = require("express");
const router = express.Router();
const { User } = require("../../db/models");

router.get("/", async (req,res)=>{
    // const user = res.locals?.user;
    const {userId} = req.query;

    try {
        const userDB = await User.findOne({where:{id: userId}});
        // console.log(userDB);
        if(userDB){
            const user = JSON.parse(JSON.stringify(userDB));
            res.json(user)
        }else{
            res.status(500).json({ message: 'err_finding_user'})
        }

    } catch (error) {
        console.log('ERR_FINDING_RESTAURANT', error);
        res.status(500).json({ message: 'err_finding_user'})
    }

});

module.exports = router;
