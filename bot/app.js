const yargs = require("yargs");
const { TickerBaseService } = require("./app_modules/tickerModule");
const { appConfig } = require('./config/config');
const { dbClient } = require('./config/database');
const { persistBotConfig } = require('./app_modules/entityManagerModule');

const parameters = yargs.argv;
dbClient.connect()
    .then(() => {
        if(parameters._.length > 0){
            appConfig.DEFAULT_INTERVAL = parameters.interval ?? appConfig.DEFAULT_INTERVAL;
            appConfig.DEFAULT_DEVIATION = parameters.deviation ?? appConfig.DEFAULT_DEVIATION;
            persistBotConfig()
                .then((botConfigId) => {
                    appConfig.CURRENT_BOT_CONFIG = botConfigId;
                    parameters._.forEach((currencyPair) => {
                        let ticker = new TickerBaseService(currencyPair);
                        ticker.getTicker();
                    });
                })
        }
    })
    .catch((error) => {
        console.log(error.message);
    });