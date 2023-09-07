const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://amansingh425442:Rajputs%40123@cluster0.sg3haq4.mongodb.net/gofood?retryWrites=true&w=majority';

const mongoConnect = async()=>{
    try{
        await mongoose.connect(mongoURI);
        console.log("mongodb connected sucessfully");
        const ftData = await mongoose.connection.db.collection("foodItems");
        console.log("collection data imported success");
   const idata =  await  ftData.find().toArray();
   const fcData = await mongoose.connection.db.collection("foodCategory");
   const cdata =  await  fcData.find().toArray();
//    console.log(data);
  global.foodItems = idata;
  global.foodCategory = cdata;
//   console.log(global.foodItems);    
    }catch(err){
        console.log("error in connection of mongodb", err);
    }
}

module.exports = mongoConnect;
