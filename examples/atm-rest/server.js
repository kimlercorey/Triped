// Dependancies
var express = require('express');
var mongoose = require('mongoose');
var parse = require('body-parser');
//var mssql = require('tedious');

// Database
mongoose.connect('mongodb://127.0.0.1/atmtest');

// Express
var app = express();
app.use(parse.urlencoded({ extended: true }));
app.use(parse.json());

// Routes
app.get('/', function(req, res){
    res.send('App is up and running');
});

app.use('/api', require('./routes/api'));

// Start server
app.listen(3000);
console.log('API running ... http://127.0.0.1:3000');