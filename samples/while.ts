
function foo(a: number, b: number, cond: boolean) {
    let x;
    x = a;
    while (cond) {
        x = b;
    }
    return x;
}
