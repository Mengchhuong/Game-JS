const canvas = document.getElementById('pingpong');
const context = canvas.getContext("2d");

document.body.style.display="flex";
document.body.style.justifyContent="center";

let keysPress={};
let scoreEnemy;
let scorePlayer;
let gameSpeed;
let paddlePlayer
let ball;
let paddleEnemy;
let place="../../assets/storages/audios/";
let audios=[place+'mashmelloalone.mp3',place+''];
let currentMusic=0;
let audio = new Audio();
let buttonMusic=document.getElementById("music");
function playAudio(){    
    audio.src=audios[currentMusic]
    audio.play();
    currentMusic+=1;
    if(currentMusic==audios.length){
        currentMusic=0;
        audio.loop=true;
        audio.autoplay=true; 
    }

}
window.onload=playAudio;
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
        update:function(){
            this.draw();
    
            if(this.x + this.dx > canvas.width-this.r || this.x + this.dx < this.r) {
                this.dx = -this.dx;
            }
            if(this.y + this.dy > canvas.height-this.r || this.y + this.dy < this.r) {
                this.dy = -this.dy;
            }
            
            this.x += this.dx;
            this.y += this.dy;
        },
        updateRightUp:function(){
            this.draw();
            this.x+=this.dx;
            this.y+=this.dy;
        },
        updateRightDown:function(){
            this.draw();
            this.x+=this.dx;
            this.y-=this.dy;
        },
        updateLeftUp:function(){
            this.draw();
            this.x-=this.dx;
            this.y+=this.dy;
            
        },
        updateLeftDown:function(){
            this.draw();
            this.x-=this.dx;
            this.y-=this.dy;
           
        },
        isCollision:function(){

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
function drawPlayer(x,y,width,height,color){
    return{
        x:x,
        y:y,
        w:width,
        h:height,
        c:color,
        s:15,
        ground:false,
        //check update movement player
        update:function(){
            if(keysPress['ArrowUp']||keysPress['KeyW']){
                this.y -=this.s;
            }
            if(keysPress['ArrowDown']||keysPress['KeyS']){
                this.y+=this.s;
            }
            if(this.y<0){
                this.y=0;
            }
            else if(this.y+this.h>canvas.height){
                this.y = canvas.height-this.h;
            }
            this.draw();
        },
        draw:function(){
            context.beginPath();
            context.fillStyle=this.c;
            context.fillRect(this.x,this.y,this.w,this.h);
            context.closePath();
        }
    }
}
function drawEnemy(x,y,width,height,color){
    return{
        x:x,
        y:y,
        w:width,
        h:height,
        s:10,
        groud:false,
        update:function(){
            this.draw();
            if(!this.ground){
                this.y+=this.s;
                this.hitBottom();
            }else{
                this.y-=this.s;
                this.hitTop();
            }
            
        },
        hitBottom:function(){
            let borderBottom = canvas.height-this.h;
            if(this.y>borderBottom){
                this.ground=true;
                this.y+=this.s;
                this.s=5;
            }
        },
        hitTop:function(){
            if(this.y<0){
                this.ground=false;
                this.y=0;
                this.s=5;
            }
        },
        draw:function(){
            context.beginPath();
            context.fillStyle=color;
            context.fillRect(this.x,this.y,this.w,this.h);
            context.closePath();
        }
    }
}
function playaudio(){
   audio.src=audios[0];
    audio.play();   
    audio.autoplay;
    audio.loop=true;
}
function updateGame(){
    requestAnimationFrame(updateGame);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.fillStyle='black';
    context.fillRect(0,0,canvas.width,canvas.height);
    context.closePath();
    // ball.updateLeftUp();
    // ball.updateLeftDown()
    ball.update();
    paddlePlayer.update();
    paddleEnemy.update();
}

function drawText(){
    return{
        
    }
}

function startGame(){
    canvas.width=900;
    canvas.height =500;
    gameSpeed=3;
    ball =drawBall(50,50,10,"#FFFFC2");
    paddlePlayer = drawPlayer(0,0,15,100,"#F70D1A");
    paddleEnemy = drawEnemy(canvas.width-15,0,15,100,"#CC6600");
    requestAnimationFrame(updateGame);
}
startGame();
