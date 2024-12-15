
function array(a: number, b: string, cond1: boolean, cond2: boolean) {
    let arr = new Array(2);
    if (cond1) {
        arr[0] = a;
    }
    if (cond2) {
        arr[1] = b;
    }
    return arr;
}

let out = array(1, "hello", true, false);
