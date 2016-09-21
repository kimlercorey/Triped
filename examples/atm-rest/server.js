var express = require('express'),
    parse = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    mssql = require('tedious'),
    ip = require('my-local-ip')(),
    port = 3000;

var app = express();

app.use(morgan('dev'));
app.use(parse.urlencoded({ extended: true }));
app.use(parse.json());
app.use(parse.json({type:'application/vnd.api+json'}));
mongoose.connect('mongodb://127.0.0.1/atm-datas');

app.use(express.static('public'));

app.use('/api', require('./routes/api'));

// Static Route
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

    <p>get atm-data: <a href="http://`+ip+`:`+port+`/api/atm-datas">http://`+ip+`:`+port+`/api/atm-datas</a></p>
    <p></p>
    <p> get rules: <a href="http://`+ip+`:`+port+`/api/rules">http://`+ip+`:`+port+`/api/rules</a> </p>`);
});



// Start server
app.listen(port);
console.log('API running ... http://' + ip + ':'+port);