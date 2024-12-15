
function array(a: number, b: string, cond: boolean) {
    let arr;
    if (cond) {
        arr = [a];
    }
    else {
        arr = [b];
    }
    return arr;
}

let out = foo(1, "hello", true);
