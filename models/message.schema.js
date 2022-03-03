const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    'id': {
        type: String
    },
    'text' : {
        type: String,     
        unique: true           
    }
}, {
    versionKey: false
});

messageSchema.set('toJSON', {
    virtuals: true
});

module.exports = messageSchema