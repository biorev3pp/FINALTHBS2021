const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prospect = new Schema({
    first_name: String,
    last_name: String, 
    company: String, 
    email: String,
    mobile: String,
    segment:String,
    products: Array, 
    contact_after: String, 
    contact_mode:Array, 
    agent_comment:String, 
    comments:String, 
    date:Date,
    other_service:String,
    tags:Array,
    other_mode:String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    actual_date: {
        type: Date,
        default: null
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    },
})

module.exports = mongoose.model('prospect', prospect);
