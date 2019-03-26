const MongoClient = require('mongodb').MongoClient;
const { DB_HOST, DB_USER, DB_PASSWORD ,DB_NAME, DB_PORT } = require("./config");
//const connectionUrl = `mongodb://${DB_HOST}:${DB_PORT}`;
const connectionUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}${DB_HOST}`;
const URL = encodeURI(connectionUrl);

module.exports = (()=>{
    let instance = null,
        isDisconnecting = false;

    function connect() {
        return new Promise((resolve, reject)=>{
            MongoClient.connect(URL, { useNewUrlParser: true }, function(err, client) {
                if (err) { reject(err); }
                console.log("Conectado satisfactoriamente al servidor de Mongo!");
                instance = client;
                resolve(client.db(DB_NAME));
            });
        });
    }

    function disconnect(){
        if (instance && !isDisconnecting){
            isDisconnecting = true;
            console.log("Desconectando instancia de Mongo");
            return new Promise((resolve, reject)=>{
                instance.close((err, result)=>{
                    if (err) { reject(err); isDisconnecting=false; return; }
                    console.log("Instancia de Mongo desconectada!");
                    resolve();
                });
            })
        }
    }

    return {
        connect,
        disconnect,
        instance: ()=> instance,
    }
})();