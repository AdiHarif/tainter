
function example1(obj: object, field1: string, field2: string, val: number) {
    const x = obj[field1];
    const y = obj[field2];
    obj[field1] = val;
    const z = obj[field1];
    return obj[field2];
}
