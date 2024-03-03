const mongoose = require('mongoose');
const { stringify } = require('querystring');

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
});

module.exports = mongoose.model("Products",productSchema);