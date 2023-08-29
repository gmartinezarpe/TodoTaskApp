const mongoose = require('mongoose');

const todoItemSchema = new mongoose.Schema({
    description:{
        type:String,
        require:true
    },
    startDate:{
        type:Date,
        require:true
    },
    endDate:{
        type:Date,
        require:true
    },



})


module.exports = mongoose.model('todo', todoItemSchema)