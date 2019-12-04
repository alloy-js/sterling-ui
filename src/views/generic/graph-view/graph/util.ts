function find_angle (p1: {x: number, y: number}, p2: {x: number, y: number}): number {
    return Math.atan2(p1.y - p2.y, p1.x - p2.x) * (180 / Math.PI);
}

export {
    find_angle
}
