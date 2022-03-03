const makeApp = require('./app');
const db = require('./db');

const app = require('./app');

(async()=> {
    try{    
        const PORT = process.env.PORT || 3000;     
        await db.connect();
        app.listen(PORT, () => {
            console.log(`Listening on Port: ${PORT}`);
        });
    } catch(err){
        console.error('Could not start the server');
    }
})();