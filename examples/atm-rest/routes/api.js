// Dependancies
var express = require('express');
var router = express.Router();

// Models - eventually automagic - for now manual
var Rule = require('../models/rule');
var AtmData = require('../models/atm-data');

// Routes
Rule.methods(['get', 'put', 'post', 'delete']);
Rule.register(router, '/rules')

AtmData.methods(['get', 'put', 'post', 'delete']);
AtmData.register(router, '/atm-datas')

// Return module
module.exports = router;