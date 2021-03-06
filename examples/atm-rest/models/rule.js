// Dependancies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Eventually this will be derived from the database schema
var ruleSchema = new mongoose.Schema({
    name: String,
    order: Number,
    rule: String
});

// return model
module.exports = restful.model('Rules', ruleSchema);