const VF = require('vexflow');
const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const path = require ('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const app = express();

const PORT=process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));
//extended true si la información que recibimos del browser está anidada en muchos niveles

app.use(session({
  name: 'jm-server-session-cookie-id',
  secret: '4u6mVaJtJrrhZb2iHx2ugBof',
  saveUninitialized: true,
  resave: true,
  store: new FileStore()
}))
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(function (err, req, res, next) {
    console.error(err, err.stack);
    res.status(500).send(err);
});

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
});
// app.get('/prueba', function(req, res){
//     res.sendFile(path.join(__dirname, 'pruebaVFXML.html'));
// });

// npm run dev
app.listen(process.env.PORT || 3000)
console.log(`Port ${PORT} on fire!!`)
