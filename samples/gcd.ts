
function abs(num: number): number {
    if (num < 0) {
        return -num;
    }
    return num;
}

function gcd(num1: number, num2: number): number {
    num1 = abs(num1);
    num2 = abs(num2);
    if (num2 > num1) {
        const tmp = num1;
        num1 = num2;
        num2 = tmp;
    }
    while (true) {
        if (num2 == 0) {
            return num1;
        }
        num1 = num1 % num2
        if (num1 == 0) {
            return num2;
        }
        num2 = num2 % num1;
    }
    return 0;
}
