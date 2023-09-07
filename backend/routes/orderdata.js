const express = require("express");
const router = express.Router();
const Order = require('../models/orders.js');

router.post('/orderdata', async(req, res)=>{
    let data = [req.body.order_data];
    await data.splice(0, 0, {date: req.body.order_date});

    let eId = await Order.findOne({'email': req.body.email})
    console.log(eId);
    if(eId === null){
        try{
         await Order.create({
            email: req.body.email,
            order_data:[data]
         })
            res.json({success: true});
         
        }catch(err){
            console.log("accha kya hua",err.message);
            res.send("server Error", err.message);
        }
    }

    else{
        try{
            await Order.findOneAndUpdate({email: req.body.email}, 
                {$push:{order_data:data}}).then(()=>{
                    res.json({success:true})
                })
        }catch(error){
            res.send("server Error", error);
        }
    }
})
module.exports = router;