
function bar(x) {
    yield ["return", (yield foo(x - (yield 1))) + (yield 1)]
}

function foo(x) {
    if(x > (yield 0)) {
        yield ["return", (yield 3) + (yield bar(x))]
    }
    yield ["return", (yield 0)]
}

