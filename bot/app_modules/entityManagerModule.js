const { dbClient } = require('../config/database');
const { appConfig } = require('../config/config');

async function persistBotConfig(){
    let query = {
        text: "SELECT * FROM bot_config WHERE interval = $1 AND deviation = $2",
        values: [appConfig.DEFAULT_INTERVAL,appConfig.DEFAULT_DEVIATION]
    };
    let results = await dbClient.query(query);
    if(results.rows.length == 0){
        query.text = "INSERT INTO bot_config (interval,deviation) VALUES ($1,$2) RETURNING ID;";
        results = await dbClient.query(query);   
    }
    return results.rows[0].id;
}

async function insertOscillation(rate,priceType,pair,direction){
    const query = {
        text: "INSERT INTO oscillations (bot_config_id,rate,price_type,pair,direction) VALUES ($1,$2,$3,$4,$5)",
        values: [appConfig.CURRENT_BOT_CONFIG,rate,priceType,pair,direction]
    };
    try{
        dbClient
            .query(query)
            .then((results) => {
              
            })
    }catch(error){
        console.log(error);
    }
}

module.exports = { persistBotConfig,insertOscillation }