const canvas = document.getElementById('pingpong');
const context = canvas.getContext("2d");
let keysPress={};
let scoreEnemy;
let scorePlayer;
let gameSpeed;
let ball;

document.addEventListener('keydown',function(event){
    keysPress[event.code] = true;

});
document.addEventListener('keyup',function(event){
    keysPress[event.code]=false;
});
function drawBall(x,y,radius,color){
    return {
        x:x,
        y:y,
        r:radius,
        c:color,
        dy:-gameSpeed,
        dx:gameSpeed,
        updateRight:function(){
            this.draw();
            this.x+=this.dx;
            this.y+=this.dy;
        },
        updateleft:function(){
            this.draw();
            this.x-=this.dx;
            this.y-=this.dy;
        },
        draw:function(){
            context.beginPath();
            context.arc(this.x, this.y, this.r,0,Math.PI*2);
            context.fillStyle=this.c;
            context.fill();
            context.closePath();
        }
    }
}
function drawScore(){
    return{
        
    }
}
function updateGame(){
    requestAnimationFrame(updateGame);
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.updateRight();
}
function startGame(){
    canvas.width=700;
    canvas.height =500;
    gameSpeed=3;
    ball =drawBall(50,50,10,"#B5EAAA");
    requestAnimationFrame(updateGame);

}
startGame();