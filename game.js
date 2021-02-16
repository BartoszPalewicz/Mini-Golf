const canvas = document.getElementById("golf");
canvas.width = 500;
canvas.height = 500;
const ctx = canvas.getContext('2d');

let toDraw = [];
let players = [];
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
    drawObject(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
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
        if(this.friction!=undefined){
        if( Math.abs(this.vy)+Math.abs(this.vx)>0.01){
            //if(this.vx < 0){this.vx+=this.friction}else{this.vx-=this.friction};
            //if(this.vy < 0){this.vy+=this.friction}else{this.vy-=this.friction};
            this.vx/=this.friction;
            this.vy/=this.friction;
        }else{
            this.vx=0;
            this.vy=0;         
        }
    }
    }    
    draw() {
        this.drawObject();
    }
}

class Rect extends Drawable {

    constructor(x, y, width, height, color = "#000") {
        super(x, y, color);
        this.width = width;
        this.height = height;
    }

    drawObject(){
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
    drawObject(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();  
    }    

}

class Ball extends Circle {
    stage=0;
    friction=1.02;
    constructor(color = "#000"){
        super(-10, -10, 7, color)
        this.line={x:this.x, y:this.y}
    }
    
    m={x:undefined,y:undefined}
    drawLine(x=this.x, y=this.y){
        for(let i = 0; i<10; i++){
        ctx.beginPath();
        ctx.arc(this.x-(this.x-this.line.x)*(i/10), this.y-(this.y-this.line.y)*(i/10), this.r-i/2, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();        
        ctx.closePath()
        }
    }
    launch(){
        this.vx=(this.x-this.line.x)/20;
        this.vy=(this.y-this.line.y)/20;
    }

 
    draw(){
        
        this.drawObject();
        if(this.stage==1)
        this.drawLine(this.line.x, this.line.y);

    }
    
}

class Player{

    constructor(name="nameles", color= "#fff"){
        this.name=name;
        this.ball=new Ball(color = color);
        if(players.length==0)this.next='first';
        else {
            this.next="last";
            players[players.length-1].next=this;
        }
        players.push(this);
    }
    click(x, y) {
        this.ball.stage++;
        if(this.ball.stage==2){this.ball.launch()};
        if(this.ball.stage==3){this.nextPlayer()};

    }
    mouseMove(x, y){
        if(this.ball.stage==0)this.ball.set(x, y);
        this.ball.line={x:x, y:y};

    }
    nextPlayer(){
        if(this.next=="last")activePlayer=players[0]
        else activePlayer=this.next;
        this.ball.stage=0;
    }
}



new Player("Bob", "#f33");
new Player("Mike", "#3f3");
new Player("Josh", "#33f");
let activePlayer = players[0];
function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    toDraw.map(function (o) { o.update() });
}

setInterval(frame, 1000 / 120)


canvas.addEventListener('mousemove', event => {

    event = event || window.event; // IE-ism

    activePlayer.mouseMove(event.offsetX, event.offsetY);


});


canvas.addEventListener('mousedown', event => {
    console.log("click!");
    
    activePlayer.click(event.offsetX, event.offsetY);
});