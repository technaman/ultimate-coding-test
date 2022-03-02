const axios = require("axios");
const log = require('../util/logger');
const API_URL = process.env.API_URL || 'https://chat.ultimate.ai/api/intents';
const checkIntents = async (botId, message) => {

    if(!botId || !message) return null;
    
    const data = JSON.stringify({botId, message});

    const config = {
    method: 'post',
    url: API_URL,
    headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json', 
        'authorization': process.env.API_KEY
    },
    data : data
    };

    try {
        const response = await axios(config);
        const data = response.data;    
        
        return data;    
    } catch (e) {
        log.error(e);
        return e;
    }

}

module.exports = checkIntents;