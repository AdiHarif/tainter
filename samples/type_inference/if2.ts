
function foo(a: number, b: string, cond: boolean) {
    let x;
    if (cond) {
        x = a;
    }
    else {
        x = b;
    }
    return x;
}

let out = foo(1, "hello", true);
