// p = load parsing rules for input
var p = require("./atm_rules_parser").parser;

// execute the parse
var exec = function exec (input) {
    return p.parse(input);
}

// make the reusult avaiable to call
exports.exec = exec;
