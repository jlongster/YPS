
// var esprima = require('esprima');

// // Executes visitor on the object and its children (recursively).
// function traverse(object, visitor) {
//     var key, child;

//     visitor.call(null, object);
//     for (key in object) {
//         if (object.hasOwnProperty(key)) {
//             child = object[key];
//             if (child && typeof child === 'object') {
//                 traverse(child, visitor);
//             }
//         }
//     }
// }

// traverse(esprima.parse('Math.sin(42);'), function(node) {
//     if(node.type == 'Literal') {
//         console.log(node);
//     }
// });


var falafel = require('falafel');
var fs = require('fs');

var src = fs.readFileSync('test.js', 'utf-8');
//var src = "foo()";

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