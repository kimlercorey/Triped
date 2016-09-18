// Eventually this will be derived from the database schema

// Dependancies
var restful = require('node-restful');
var mongoose = restful.mongoose;

var atm_dataSchema = new mongoose.Schema({
    atm: { _id : Number,
           session:[{
            _id: Number,    
            transaction:[{
                _id: Number,
                _type: String,
                name: String,
                account: String,
                photo: String,
                amount: Number,
                destination_account: String
        }]  
    }]}
});

// return model
module.exports = restful.model('Atm-data', atm_dataSchema);