const express = require("express");
const router = express.Router();

router.post('/fooddata', async(req,res)=>{
      try{
          res.send([global.foodItems, global.foodCategory]);
      }catch(error){
        console.log("error in fetching fooditems", error);
        res.send("server error");
      }
});

module.exports =  router;