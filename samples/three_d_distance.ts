
function three_d_distance(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number {
    const xDiff = x2 - x1;
    const yDiff = y2 - y1;
    const zDiff = z2 - z1;
    const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff + zDiff * zDiff);

    return distance;
}
