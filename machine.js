
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
