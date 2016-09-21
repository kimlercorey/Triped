// Eventually this will be derived from the database schema

// Dependancies
var restful = require('node-restful');
var mongoose = restful.mongoose;

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

/*
atm_dataSchema.path('atmsession').validate(function(atmsession){
    if(!atmsession){return false}
    else if(atmsession.length === 0){return false}
    return true;
}, 'Your submission requires at least one session');
*/

// return model
module.exports = restful.model('atm-data', atm_dataSchema);
