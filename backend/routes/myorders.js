const express = require("express");
const router = express.Router();
const Order = require('../models/orders.js');

router.post('/myorders', async(req,res)=>{
      try{
        let data = await Order.findOne({email:req.body.email});
        res.json({orderData: data});
      }catch(error){
        console.log(error);
        res.send("server Error", err.message);
      }
})
module.exports = router;