const express = require("express");
require('dotenv').config();
const {logRequest, validateRequest} = require('./util/utils');
const app = express();
const processReply = require("./services/processReply.service");

app.use(logRequest);

app.get('/', validateRequest, processReply);        

app.use((err, req, res, next) => {    
    res.status(500).json({message: 'Something broke. Please try back after sometime.'});
});    

module.exports = app;