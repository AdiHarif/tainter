
function foo(a: number, b: number, o: object, f1: string, f2: string) {
    const c = a*a + 2*a*b + b*b;
    let tmp = o[f1];
    while (tmp != c) {
        if (o[f1] - c > 0) {
            o[f1] = o[f1] - o[f2];
        }
        else {
            o[f1] = o[f1] + o[f2] + a;
        }
        tmp = o[f1];
    }
    return;
}
