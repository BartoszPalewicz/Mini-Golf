const canvas = document.getElementById("golf");
canvas.width = 500;
canvas.height = 500;
const ctx = canvas.getContext('2d');

let toDraw = [];
toDraw.concat("asd");

class Drawable {
    vx = 0;
    vy = 0;
    ax = 0;
    ay = 0;
    constructor(x = 0, y = 0, color = "#000") {
        this.x = x;
        this.y = y;
        this.color = color;
        toDraw.push(this);
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    move(x = this.vx, y = this.vy) {
        this.x += x;
        this.y += y;
    }
    set(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    update() {
        this.vx += this.ax;
        this.vy += this.ay;
        this.move();
        this.draw();
    }
}

class Rect extends Drawable {

    constructor(x, y, width, height, color = "#000") {
        super(x, y, color);
        this.width = width;
        this.height = height;
    }
    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

class Circle extends Drawable {

    constructor(x, y, r, color = "#000") {
        super(x, y, color);
        this.r = r;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

let kw = new Rect(50, 50, 40, 100, "#d55");
// kw.colision=function (){
//     if(this.x >= canvas.width-this.width)
// }
function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    toDraw.map(function (o) { o.update() });
}

setInterval(frame, 1000 / 60)
