const { default: mongoose } = require("mongoose");
const messageSchema = require("./message.schema");

const MessageModel = mongoose.model('message', messageSchema);

module.exports = MessageModel;