const { apiClient } = require('./apiModule');
const { appConfig } = require('../config/config');
const { insertOscillation } = require('./entityManagerModule');

function TickerBaseService(currencyPair){

    this.currencyPair = currencyPair,
    this.firstValue = false,
    
    this.getTicker = () => {
        setInterval(() => {
            apiClient.request("ticker/"+this.currencyPair)
                .then((data) => {
                    if(!this.firstValue){
                        this.firstValue = data;
                    }else{
                        checkDeviation(this.firstValue.ask,data.ask,"ask",this.currencyPair);
                        checkDeviation(this.firstValue.bid,data.bid,"bid",this.currencyPair);
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                })
        },appConfig.DEFAULT_INTERVAL);
    }
}

function checkDeviation(firstValue,currentValue,priceType,currencyPair){
    if(firstValue != currentValue){
        let x = (currentValue * 100)/firstValue;
        if(x > 100){
            x = x - 100;
            if(x.toFixed(2) >= appConfig.DEFAULT_DEVIATION){
                console.log(priceType+" price increased for the currencyPair : "+currencyPair);
                insertOscillation(x.toFixed(2),priceType,currencyPair,'increased');
            }
        }else{
            x = 100 - x;
            if(x.toFixed(2) >= appConfig.DEFAULT_DEVIATION){
                console.log(priceType+" price decreased for the currencyPair : "+currencyPair);
                insertOscillation(x.toFixed(2),priceType,currencyPair,'decreased');
            }
        }
    }
}

module.exports = {  TickerBaseService   };