
function foo(a: number, b: string, cond: boolean) {
    let x: any = 0;
    while (true) {
        if (cond) {
            x = x + a;
        }
        else {
            x = b;
        }
    }
    return x;
}

let out = foo(1, "hello", true);
