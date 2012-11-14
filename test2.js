
function bar(x) {
    yield ["return", (yield foo(x - (yield 1))) + (yield 1)]
}

function foo(x) {
    if(x > (yield 0)) {
        yield ["return", (yield 3) + (yield bar(x))]
    }
    yield ["return", (yield 0)]
}

var stack = [];

function run(gen) {
    var res;
    stack.push(gen);

    while(true) {
        try {
            res = (res === undefined ? gen.next() : gen.send(res));
            if(res[0] === 'return') {
                res = res[1];
                stack.pop();

                if(stack.length) {
                    gen = stack[stack.length - 1];
                }
                else {
                    return res;
                }
            }
            else if(res.toString().indexOf('Generator') !== -1) {
                gen = res;
                stack.push(gen);
                res = undefined;
            }
        }
        catch(e) {
            if(e instanceof StopIteration) {
                stack.pop();
                res = undefined;

                if(stack.length) {
                    gen = stack[stack.length - 1];
                }
                else {
                    return res;
                }
            }
            else {
                throw e;
            }
        }
    }
}

