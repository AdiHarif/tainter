
function foo(a: number, b: number, cond: boolean) {
    let x;
    if (cond) {
        x = a;
    }
    else {
        x = b;
    }
    return x;
}
