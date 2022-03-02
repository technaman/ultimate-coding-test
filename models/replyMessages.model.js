const mongoose = require("mongoose");
const messageSchema = require("../message.schema");

const replyMessageModel = mongoose.model('ReplyMessage', messageSchema);

module.exports = replyMessageModel;