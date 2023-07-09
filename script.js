const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let dt = 1;
let interval = 0.00000001;
let collisionCount = 0;
let circles = [];

class Circle {
    constructor(x, r, m, v) {
        circles.push(this);
        this.x = x;
        this.r = r;
        this.m = m;
        this.v = v;
    }

    move() {
        this.x += this.v * dt;
    }
}

let small = new Circle(20, 10, 1, 0);
let big = new Circle(52, 20, 1000, -1);

function drawAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const obj of circles) {
        ctx.beginPath();
        ctx.arc(obj.x, 50, obj.r, 0, Math.PI * 2, true);
        ctx.fill();
    }
}

function collision() {
    let x1 = circles[0].x;
    let x2 = circles[1].x;
    let r1 = circles[0].r;
    let r2 = circles[1].r;
    let m1 = circles[0].m;
    let m2 = circles[1].m;
    let v1 = circles[0].v;
    let v2 = circles[1].v;
    if (Math.abs(x1 - x2) <= r1 + r2) {
        collisionCount++;
        console.log(collisionCount);
        circles[0].v = (((m1 - m2) * (v1)) / (m1 + m2)) + ((2 * m2) * v2) / (m1 + m2);
        circles[1].v = (((m1 - m2) * (v2)) / (m1 + m2)) + ((2 * m1) * v1) / (m1 + m2);
        
    } else if (x1 - r1 <= 0) {
        collisionCount++;
        console.log(collisionCount);
        circles[0].v *= (-1);
    }

}

function tick() {
    // drawAll();
    for (const obj of circles) {
        obj.move();
    }
    collision();

    if (circles[0].v > 0 && circles[1].v > 0 && circles[1].v - circles[0].v > 0){
        console.log("---------No more collision-----------")
    }
}

function stop() {
    clearInterval(loop);
}

window.onload = tick;
let loop = setInterval(tick, interval);