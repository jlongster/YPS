
var falafel = require('falafel');
var fs = require('fs');
var util = require('util');

if(process.argv.length < 3) {
    util.puts('Usage: node yps <filename>');
    process.exit(1);
}

var filename = process.argv[2];
var src = fs.readFileSync(filename, 'utf-8');

function yieldN(node) {
    node.update('(yield ' + node.source() + ')');
}

console.log(falafel(src, function(node) {
    // if(node.type == 'FunctionExpression') {
    //     if(node.id) {
    //         var name = node.id.name;
    //         var pars = node.params.map(function(p) { return p.source(); });

    //         node.update('var ' + name + ' = ' + 
    //                     'function(' + pars.join(',') + ')' +
    //                     node.body.source());
    //     }
    //     else {
    //         yieldN(node);
    //     }
    // }
    if(node.type == 'CallExpression') {
        yieldN(node);
    }
    else if(node.type == 'Literal') {
        yieldN(node);
    }
    else if(node.type == 'ReturnStatement') {
        node.update('yield ["return", ' + node.argument.source() + ']');
    }
}));