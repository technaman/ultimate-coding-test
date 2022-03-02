const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    'id': {
        type: mongoose.Types.ObjectId,        
    },
    'text' : {
        type: String,                
    }
}, {
    versionKey: false
});

module.exports = messageSchema