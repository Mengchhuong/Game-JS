
var canvas = document.getElementById("mygame");
canvas.width= 700;
canvas.height= 400;
var context = canvas.getContext('2d');
//move the paddle 
let moveUp=false,moveDown=false;
var x = canvas.width/2;
var y = canvas.height/2;
var dx = 5;
var dy = -2;
var score =0;
var userscore=0;
let ball;

function background() {
    // set a style
    context.fillStyle = "#000"; /* whatever comes below this acquires black color (#000). */
    // draws the black board
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  background();

//draw ball
function drawBall(x,y){
    return{
        x:x,
        y:y,
        update:function(){
            context.beginPath();
            context.arc(this.x, this.y, 10, 0, Math.PI *2);
            context.fillStyle = "#FFFFFF";
            context.fill();
        }
    }
   
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
    },100);
}
randomEnemy(paddleEnemy);

function draw() {
    // context.clearRect(0, 0, canvas.width, canvas.height);
    erase();
    // drawBall(x,y);
    ball = drawBall(x,y)
    ball.update();
    paddleEnemy.draw();
    paddleUser.draw();
    
    if(x + dx > canvas.width-10 || x + dx < 10) {
        // x= x-12;
        // x= canvas.width +20;
        dx = -dx;
       
        // comScore.play();
        
    }
    if(y + dy > canvas.height-10 || y + dy < 10) {
        dy = -dy;
    }
    x += dx;
    y += dy;

    if(paddleUser.x<x+10&&paddleUser.y<y+10&&paddleUser.x+paddleUser.w&&x-10&&paddleUser.y+paddleUser.h>x-10&&paddleUser.y+paddleUser.h>y-10){
        console.log(x)
        y -=dy;
        // dy = -dy;
    }
    else if ( x  == 10){
        score++;
        x = canvas.width/2;
        y = canvas.height/2;
        ball = drawBall(x,y)
        ball.update();
        dx =  5;
        dy = -2;
    }
    else if ( x ==690 ){
        userscore++;
        x = canvas.width/2;
        y = canvas.height/2;
        ball = drawBall(x,y)
        ball.update();
        dx = -5;
        dy = 2;
    }
   
    // console.log(score);
    // console.log(userscore);

// function isCollision(){
//     return(paddleUser.x<x+10&&paddleUser.y<y+10&&paddleUser.x+paddleUser.w&&x-10&&paddleUser.y+paddleUser.h>x-10&&paddleUser.y+paddleUser.h>y-10)
// }
//     // var randomUp = canvas.height; 
//         // if(paddle.y>=canvas.height){
//         //     // paddle.y = randomUp;
//         //     paddle.y-=10;
//         // }
//         // else if(paddle.y>=0 && paddle.y<320){
//         //     paddle.y+=10;
//         //     if(paddle.y==320){
//         //         paddle.y=0;
//         //     }
//         // }
  
}
setInterval(draw, 50);

function startGame(){

    // erase();
    // context.clearRect(0,0,paddleUser.w,);
    
    controllKeyPress(paddleUser);
    // paddleUser.draw();
    // drawBall();
    // paddleEnemy.draw();
    // draw();
    
}
// function isCollision(){
//     // return (x+10>paddleUser.x&&paddleUser.x+paddleUser.w>x);
//     return{
//         updateRightUp:function(){
//             drawBall();
//             x+=dx;
//             y+=dy;
//         },
//         updateRightDown:function(){
//             drawBall();
//             x+=dx;
//             y-=dy;
//         },
//         updateLeftUp:function(){
//             drawBall();
//             x-=dx;
//             y+=dy;
//         },
//         updateLeftDown:function(){
//             drawBall();
//             x-=dx;
//             y-=dy;
//         }

//     }
    
// }

// function update(){
//     console.log(x);
    
//     if( x - 10 < 0){
//         user.score++;
//         userScore.play();
//         resetBall();
//     }
// }
// update();
