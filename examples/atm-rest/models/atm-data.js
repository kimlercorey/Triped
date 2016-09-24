// Dependancies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Eventually this will be derived from the database schema
var transactionSchema = new mongoose.Schema({
    transactionid: Number,  
    transactiontype: String, 
    name: String, 
    account: String, 
    photo: String, 
    amount: Number, 
    destination_account: String 
});

var sessionSchema = new mongoose.Schema({
    sessionid: String,
    transactions: [transactionSchema]
});

var atm_dataSchema = new mongoose.Schema({         
    atmid: String,
    atmsessions: [sessionSchema]
});

// return model
module.exports = restful.model('atm-data', atm_dataSchema);
