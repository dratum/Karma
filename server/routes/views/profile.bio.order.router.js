const express = require("express");
const router = express.Router();
const { User, Response, Bid } = require("../../db/models");

router.get("/", async (req,res)=>{
    const {userId} = req.query;
    // console.log(userId);
    try {
        const completedOrdersDB  = await Response.findAll({where:{user_id: userId}});
        const totalOrdersDB = await Bid.findAll({where:{author_id: userId}});
        const completedOrders = completedOrdersDB.length;
        const totalOrders = totalOrdersDB.length;
        // console.log(completedOrders.length);
        // console.log(completedOrders, totalOrders);
        if(completedOrders&&totalOrders){
            res.json({ totalOrders, completedOrders })
        }else{
            res.status(500).json({ message: 'err_finding_orders'})
        }

    } catch (error) {
        console.log('ERR_FINDING_RESTAURANT', error);
        res.status(500).json({ message: 'err_finding_orders'})
    }

});

module.exports = router;
