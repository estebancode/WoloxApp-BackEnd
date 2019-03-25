const express = require('express');
const morgan = require('morgan');
const mongo = require("./db/connect");
const app = express();

// settings
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.set('port', process.env.PORT || 4000);
app.set('json spaces', 2);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.get('/', (req, res) => {
    res.json({ 'server': 'running ...' });
});
app.use('/api/users', require('./routes/users'));
app.use('/api/albums', require('./routes/albums'));
app.use('/api/photos', require('./routes/photos'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/synchronize', require('./routes/synchronize'));

// init mongo
async function initDB() {
    const db = await mongo.connect();
    if (db) {
         initExpress();
    }else{
        console.log("database not connect");
    }
}

// init express js
function initExpress() {
    console.log("Iniciando instancia de Express...");
    // starting the server
    app.listen(app.get('port'), () => {
        console.log(`Server on port ${app.get('port')}`);
    });
    process.on("SIGINT", closeApp);
    process.on("SIGTERM", closeApp);
}

function closeApp() {
    mongo.disconnect()
        .then(() => process.exit(0));
}

// init all
initDB();