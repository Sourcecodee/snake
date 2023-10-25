const canva = document.querySelector('.canva');
const can = canva.getContext('2d');
const boxsize = 20;
var snakeX = 5*boxsize;
var snakeY = 7*boxsize;
var foodX;
var foodY;
var maxW;
var maxH;
var speedX=0;
var speedY=0;
const rows = 20;
const cols = 20;
var snakebody=[]
const counter=document.querySelector('.num');
let count=0;
var gameOver=false;

// width and height of game board
maxW=rows*boxsize;
maxH=rows*boxsize

canva.width = maxW;
canva.height = maxH;

window.onload = draw();

// this renders the game board 
function draw(){
    window.addEventListener('keyup', (e)=> {
        changeDirection(e)
    })

    can.fillStyle='grey';
    can.fillRect(0, 0, maxW, maxH);
    can.strokeStyle='black';
    can.strokeRect(0, 0, maxW, maxH);

    can.fillStyle='indigo'
    can.fillRect(snakeX, snakeY, boxsize, boxsize);
    can.strokeStyle='black';
    can.strokeRect(snakeX, snakeY, boxsize, boxsize);

    // Note to self: if the setInterval method is called within the event listener; the interval increases and sums itself for the overall output and the interval is corrupted
    placefood();
}

var id = setInterval(update, 1000/10);
console.log(id)


// this function is consistently called every 1000/10 seconds
function update(){
    if(gameOver==true){
        draw()
        return;
    }

    // draw game board
    can.fillStyle='grey';
    can.fillRect(0, 0, maxW, maxH);
    can.strokeStyle='black';
    can.strokeRect(0, 0, maxW, maxH);

    // draw food
    can.fillStyle='green';
    can.fillRect(foodX, foodY, boxsize, boxsize);
    can.strokeStyle='black';
    can.strokeRect(foodX, foodY, boxsize, boxsize);

    if(snakeX===foodX && snakeY===foodY){
        snakebody.push([foodX, foodY])
        placefood();
        count+=5;
        counter.innerHTML=count;
    }

    // this gives to former position of the snakebody to the next item in the snakebody array
    for(i=snakebody.length-1; i>0; i--){
        snakebody[i]=snakebody[i-1];
    }

    // checks if the snakebody contains a value
    if(snakebody.length){
        snakebody[0]=[snakeX, snakeY];
    }

    // this draws the snake and its border 
    can.fillStyle='indigo'
    snakeX += speedX*boxsize;
    snakeY += speedY*boxsize;
    can.fillRect(snakeX, snakeY, boxsize, boxsize);
    can.strokeStyle='black';
    can.strokeRect(snakeX, snakeY, boxsize, boxsize);


    for(i=0; i<snakebody.length; i++){
        can.fillStyle='indigo';
        can.fillRect(snakebody[i][0], snakebody[i][1], boxsize, boxsize)
        can.strokeStyle='black';
        can.strokeRect(snakebody[i][0], snakebody[i][1], boxsize, boxsize)
    }



    // Gameover conditions
    // when the snake goes out of bounds
    if(snakeX<0||snakeX===maxW||snakeY<0||snakeY===maxH){
        alert('Game over')
        gameOver=true;
        clearInterval(id)
        return;
    }
    
    // when the snake eats it's own body  
    for(let i=0; i<snakebody.length; i++){
        if(snakeX==snakebody[i][0] && snakeY==snakebody[i][1]){
            alert('Game over')
            gameOver=true;
            clearInterval(id)
            return;
        }
    }
}


// function to change direction of snake using keyboard event
function changeDirection(e){
    if(e.key=='ArrowRight'&&speedX!=-1){
        speedX=1;
        speedY=0;
    }
    if(e.key=='ArrowLeft'&&speedX!=1){
        speedX=-1;
        speedY=0;
    }
    if(e.key=='ArrowDown'&&speedY!=-1){
        speedX=0;
        speedY=1;
    }
    if(e.key=='ArrowUp'&&speedY!=1){
        speedX=0;
        speedY=-1;
    }
}

// this places the snake food at random location on the board and it contains a condition to prevent the food from being placed on the snakebody
function placefood(){
    foodX = Math.floor(Math.random()*cols)*boxsize;
    foodY = Math.floor(Math.random()*rows)*boxsize;
    for(let i=0; i<snakebody.length; i++){
        if(snakebody[i][0]==foodX && snakebody[i][1]==foodY){
            console.log('Yes');
            placefood();
        }
    }
    can.fillStyle='green';
    can.fillRect(foodX, foodY, boxsize, boxsize);
    can.strokeStyle='black';
    can.strokeRect(foodX, foodY, boxsize, boxsize);
}
