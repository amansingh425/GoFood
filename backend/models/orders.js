const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    email:{
        type: String,
        required:true,
        unique: true
    },
    order_data:{
        type: Array,
        required: true,
    }
})

module.exports = new mongoose.model('Order',OrderSchema);