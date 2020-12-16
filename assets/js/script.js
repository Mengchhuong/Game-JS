
var canvas = document.getElementById("mygame");
canvas.width= 700;
canvas.height= 400;
var context = canvas.getContext('2d');
//move the paddle 
let moveUp=false,moveDown=false;
var x = canvas.width/2;
var y = canvas.height/2;
var dx = 2;
var dy = -2;

function background() {
    // set a style
    context.fillStyle = "#000"; /* whatever comes below this acquires black color (#000). */
    // draws the black board
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  background();

//draw ball
function drawBall(){
    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI *2);
    context.fillStyle = "#FFFFFF";
    context.fill();
}

//draw paddle
function drawRec(x,y,width,height,speed){
    return {
        x:x,
        y:y,
        w:width,
        h:height,
        s:speed,
        draw:function(){
            context.fillStyle="#FF0000";
            context.fillRect(this.x,this.y,this.w,this.h);
        },
    }
}

var paddleUser=drawRec(0,0,10,80,10); 
var paddleEnemy = drawRec(690,0,10,80,10);

function controllKeyPress(paddle){
    if(paddle.y>0){
        if(moveUp)paddle.y-=paddle.s;
    }
    if(paddle.y<320){
        if(moveDown)paddle.y+=paddle.s;
    }
}

function erase(){
    context.fillStyle="black";
    context.fillRect(0,0,canvas.width,canvas.height);
}

document.addEventListener("keydown",function(event){
    moveDown=false;moveUp=false;
    if(event.key=="ArrowUp") moveUp=true;
    else if(event.key=="ArrowDown") moveDown=true;
    console.log(moveDown)
    startGame();
})
startGame();

function randomEnemy(paddle){
    var randomUp = canvas.height - paddle.h; 
    setInterval(function(){ 
        // paddle.y=Math.random() * 320;
        // console.log(paddle.y);
        if(paddle.y>=randomUp){
            paddle.y = randomUp;
            paddle.y-=10;
        }
        else if(paddle.y>=0 && paddle.y<320){
            paddle.y+=10;
            if(paddle.y==320){
                paddle.y=0;
            }
        }
    },50);
}


randomEnemy(paddleEnemy);

function draw(paddle) {
    // context.clearRect(0, 0, canvas.width, canvas.height);
    erase();
    drawBall();
    paddleEnemy.draw();
    paddleUser.draw();
    
    if(x + dx > canvas.width-10 || x + dx < 10) {
        dx = -dx;
    }
    if(y + dy > canvas.height-10 || y + dy < 10) {
        dy = -dy;
    }
    x += dx;
    y += dy;

    var randomUp = canvas.height - paddle.h; 
        if(paddle.y>=randomUp){
            paddle.y = randomUp;
            paddle.y-=10;
        }
        else if(paddle.y>=0 && paddle.y<320){
            paddle.y+=10;
            if(paddle.y==320){
                paddle.y=0;
            }
        }
  
}

setInterval(draw, 20);

function startGame(){

    // erase();
    // context.clearRect(0,0,paddleUser.w,);
    
    controllKeyPress(paddleUser);
    // paddleUser.draw();
    // drawBall();
    // paddleEnemy.draw();
    // draw();
    
}

