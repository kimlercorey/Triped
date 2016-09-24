
var parser = require("./atm_rules_parser").parser;

var name = "atm_rules_parser";

var exec = function exec (input) {
    return parser.parse(input);
}

exports.name = name;
exports.exec = exec;
