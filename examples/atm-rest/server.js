var express = require('express'),
    parse = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    mssql = require('tedious'),
    ip = require('my-local-ip')(),
    parse_validation = require('./parse/parser.js'),
    port = 3000;

var app = express();

// logging
app.use(morgan('dev'));

// cors on express - http://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Add req.text for plain text post to parse data 
app.use(function(req, res, next){
  if (req.is('text/*')) {
    req.text = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk){ req.text += chunk });
    req.on('end', next);
  } else {
    next();
  }
});

// Adds support for public routes
app.use(express.static('public'));

// json input
app.use(parse.urlencoded({ extended: true }));
app.use(parse.json());
app.use(parse.json({type:'application/vnd.api+json'}));

// Connect to mongo for dynamic routes
mongoose.connect('mongodb://127.0.0.1/atm-datas');

// Static Routes
app.post('/parse', function(req, res){  
    console.log("Recieving: " + req.text + " to process..." );
    response = '{ "reponse" : "' + parse_validation.exec(req.text) + '" }';
    console.log( "Using: " +  parse_validation.name + " generates result: " + parse_validation.exec(req.text) );
    res.send( response ); 
});

// Data driven Routes
app.use('/api', require('./routes/api'));

// this needs to be moved out to a template at some point
app.get('/', function(req, res){
    res.send(`
    <style>
        .header img {
        float: left;
        width: 80px;
        height: 80px;
        background: #555;
        opacity: 0.5;
        }

        .header h1 {
        position: relative;
        top: 18px;
        margin-bottom: 50px;
        left: 10px;
        }
    </style>
    <div class="header">    
    <img src="images/triped.jpg">
    <h1>Triped is running.</h1> 
    </div>

    <p>Post/get json atm-data: <a href="http://`+ip+`:`+port+`/api/atm-datas">http://`+ip+`:`+port+`/api/atm-datas</a></p>
    <p></p>
    <p>Post/get json rules: <a href="http://`+ip+`:`+port+`/api/rules">http://`+ip+`:`+port+`/api/rules</a> </p>
    <p></p>
    <p>Apply rules - post plain-text body to process: <a href="http://`+ip+`:`+port+`/parse">http://`+ip+`:`+port+`/parse</a> <br>
    (e.g. returns Abstract Syntax Tree - "rules.name is a String" becomes 'WORD ISA WORD')
    </p>
    `);
});

// Start server
app.listen(port);
console.log('API running ... http://' + ip + ':'+port);