
// You can implement a sort of CPS by injecting "yield" on every
// expression and explicitly controlling the flow. of a program.
// I call it "Yield Passing Style." The following in the machine to
// run the code, a transformer to make the yield-abused code, and an
// example file.
//
// Unfortunately the performance is slow. It seems like there is a
// 100x performance hit. Haha.
//
// See it in action here: 

var stack = new Array(50000);
var stackIdx = -1;

function run(gen) {
    // Take a generator and step through it. When a generator is
    // produced, that signifies a function call and we pop it on the stack
    // and step through it.

    var res;
    stackIdx++;
    stack[stackIdx] = gen;

    while(true) {
        res = (res === undefined ? gen.next() : gen.send(res));
        if(res[0] == 'return') {
            res = res[1];
            stackIdx--;

            if(stackIdx > -1) {
                gen = stack[stackIdx];
            }
            else {
                return res;
            }
        }
        else if(res.toString() == '[object Generator]') {
            gen = res;
            stackIdx++;
            stack[stackIdx] = gen;
            res = undefined;
        }
    }
}

// This only works with functions that explicity return values.
// The following code should be added to allow functions that don't
// return. We don't include it now so that we can isolate performance
// bottlenecks.
//
//try {
// }
// catch(e) {
//     if(e instanceof StopIteration) {
//         stackIdx--;
//         res = undefined;

//         if(stackIdx > -1) {
//             gen = stack[stackIdx];
//             run(gen);
//         }
//         else {
//             return res;
//         }
//     }
//     else {
//         throw e;
//     }
// }
