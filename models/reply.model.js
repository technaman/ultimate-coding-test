const mongoose = require('mongoose');
const {ObjectId} = require('mongoose').Types;
const messageSchema = require('./message.schema');


const replySchema = new mongoose.Schema({    
    'name': {
        type: String,
        unique: true
    },
    'description': {
        type: String
    },
    'trainingData' : {        
        messages: {
            type: [messageSchema],
            default: []
        }
    },
    'reply': {
        type: messageSchema    
    }
});

const Reply = mongoose.model('replyset', replySchema);

module.exports = Reply;