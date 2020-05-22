const express = require('express');
const path = require('path');
///const morgan = require('morgan');
//const mysql = require('mysql');
//const myconnection  = require('express-myconnection');
require('dotenv').config();

const dataConnection = {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    database : process.env.DB_NAME,
    port     : process.env.DB_PORT,
    password : process.env.DB_PASS
}

app = express();

// Settings
app.set('port', process.env.PORT || 2040);
//app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

// Middlewares
///app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//app.use(myconnection(mysql,dataConnection,'single'));

// Global Variables

// Import Routes
app.use(require('./routes/datalogger.routes.js'));
//const configRouter = require('./routes/config');
//const homeRouter = require('./routes/home');
// Routes
//app.use('/',homeRouter);
//app.use('/',configRouter);
// Public
//app.use(express.static(path.join(__dirname, 'public')));

// Server
app.listen(app.get('port'), function(){
    console.log('Server on port '+app.get('port'));
});
