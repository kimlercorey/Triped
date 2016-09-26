
var parser = require("./atm_rules_parser").parser;

var name = "atm_rules_parser";

var exec = function exec (input) {
    
var r;

// catch any parse error and return as a 200 for processing 
    try { r = parser.parse(input); }
    catch (err) { r = err.message;}
return r; 
}




exports.name = name;
exports.exec = exec;
