const fetch = require("node-fetch");
require("dotenv").config();

module.exports = {    
    apiClient : {
        request: async (path) => {
            const response = await fetch(process.env.API_URL+path);
            if(response.ok){
                return await response.json();
            }else{
                throw new Error("An error has ocorred when requesting "+BASE_URL+path);
            }
        }
    }
};