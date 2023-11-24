
//catching different elements from our game page
let randomitem = document.getElementById('randomitem')
var liveremaing =document.getElementById('liveremain')
const playBtn = document.getElementById('startGameBtn');
const startGameContainer = document.getElementById('startGame');
const mainContainer = document.getElementById('mainContainer');

//declaring bomb = 5 , and initializing score=0 and other varibles

var bomb=5;
let score = 0;
let isGameStarted = false;
let isGamePause = false;
let isGameEnd = false;
let animationId;

//fetching check from localstorage  to make change in shape 

var check=localStorage.getItem('check')

// using add event listener to redirect to gameover page

const endgameButton = document.getElementById('endgame');
const endGameContainer = document.getElementById('gameEndDiv');

endgameButton.addEventListener('click',()=>{
   location.href='gameover.html'
})

//Canvas making

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// const backgroundImage = new Image();
// backgroundImage.src='https://i.pinimg.com/originals/50/cd/3b/50cd3bed5c4763ec64f5082010e9b09e.gif';

// backgroundImage=function(){
//     context.drawImage(backgroundImage,0,0,canvas.width,canvas.height)
// };

//to set canvas to full Screen mode 

function resizeCanvas(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}

//this is to make our canvas responsive for mobile view also

resizeCanvas();
window.addEventListener('resize',resizeCanvas);

//setting background image to our canvas

const backgroundImage = new Image();
backgroundImage.src='https://i.pinimg.com/originals/15/96/6c/15966cfd2da3fd68ade8de4fe8bf75f6.jpg';

function background(){
 context.drawImage(backgroundImage,0,0,canvas.width,canvas.height)
};


//getting username and displaying it by using local storage

let username=document.getElementById('username')
let playername =localStorage.getItem('userName')
username.innerHTML = playername;

// first user interface , where we can click the play button 

playBtn.addEventListener('click', () => {
    startGameContainer.style.display = 'none';
    //now countdown display will get displayed 
    mainContainer.style.display = 'flex';
    alertTimer();
    //initializing score to 0

    score = 0;
    updateScore(0);
    gameStartSound.play();
    isGameStarted = true;
    isGameEnd = false;

    //here we are calling our canvas integrated functions which are at bottom
    //But they will work after 6 sec because duration is 6000
    setTimeout(() => {
        animate();
        startRenderingBallsInterval();
        startGameTimer();
    }, 6000)
})


//main timer of the game 

const startGameTimer = () => {
    //we have given boolen value to is game start
    if (!isGameStarted) {
        return
    }
    //initialzing the total second 120 so timer will run in reverse

    let totalTime = 120;

    //Interval to update the timer

    let interval = setInterval(() => {

       let time=totalTime;

        //upadtating the tiem in our game page
        document.getElementById('second').innerHTML = `TIME : ${time}`

        totalTime--;

        //when time reaches 0 or bomb means our lives become 0
        //then we have to clear interval and also our canvas
        //along with last interface that end container should be shown

        if (totalTime < 0 ||bomb==0) {
            //clearing interval
            clearInterval(interval);
            document.getElementById('second').innerHTML = `GAME OVER`;
            //making endgamecontainer visible
            endGameContainer.style.display = 'flex';
            //update to score to game page
            document.getElementById('endGameScore').innerHTML = score;
            isGameEnd = true;
            isGameStarted = false;
            gameEndSound.play();
            //Clearing our the canvas elements
            ballArray = [];
            ballParticlesArray = [];
            blackshapeArray = [];
        }
    }, 1000)
}

//second timer which works for count down

const alertTimer = () => {
    const timerone = document.getElementById('timerone');
    // starting the countdown timer from 5 sec
    let currentSecond = 5;
    let timerInterval = setInterval(() => {
        //upatating the value to countdown to gamepage
        timerone.innerHTML = ``;
        timerone.innerHTML = `<h1>${currentSecond}</h1>`;
        currentSecond--;
        //when time reaches zero the timer get clear and also get removed
        if (currentSecond < 0) {
            clearInterval(timerInterval);
            timerone.innerHTML = ``;
            isGamePause = false;
            return
        }
    //calling the sound to play when timer starts
        timeBeepSound.play()
    }, 1000)
}

//drawstar function written below will be add after some time where we can select star shape also
//due to lack to time , I haven't added it but I will add this soon 

function drawStar(context,cx,cy,spikes,outerRadius,innerRadius){
    var rot = Math.PI /2*3;
    var x=cx;
    var y=cy;
    var step = Math.PI/spikes;

    context.beginPath();
    context.moveTo(cx,cy - outerRadius);
    
    for(var i=0;i<spikes;i++){
        x=cx + Math.cos(rot) * outerRadius;
        y=cy + Math.sin(rot) * outerRadius;
        context.lineTo(x,y);
        rot += step;

        x=cx + Math.cos(rot) * innerRadius;
        y=cy + Math.sin(rot) * innerRadius;
        context.lineTo(x,y);
        rot += step;
    }
    context.lineTo(cx,cy-outerRadius);
    context.closePath();
    context.lineWidth=5;
    context.strokeStyle=this.color
    context.stroke()
}

//this is a function of implementing ccolourful shape inn our game
function Ball() {
//getting coordinates (x,y) and random color and size for our shapes 
    this.x = Math.floor(Math.random() * window.innerWidth);
    this.y = Math.floor(window.innerHeight);
    this.size = Math.floor((Math.random() * 10) + 35);
    this.color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
    this.speedY = 10;
    this.speedX = Math.round((Math.random() - 0.5) * 4);

    //updating the random positins of the ball

    this.update = () => {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.speedY -= .1;
    }


    //rendering our shapes on the canvas

// console.log(check)
//so if we choose circle in (choose.html) then check will be true
//and on the bases of that first condition of if statement will work
//similarly in else the box shapes will be given

    this.draw = () => {
        if(check==='true'){
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
        // console.log('circle')
        }
        else{
            context.fillStyle = this.color;
            const width=80;
            const height=80;
            context.fillRect(this.x,this.y,width,height);
            // console.log('box')
        }
    }
}

//Ball Particles which came after cutting any shape

function BallParticles(x, y, color) {

    //we will get cordinates (x,y) and colour inputs on the bases of shape we cut and its of which color 
        this.x = x;
        this.y = y;
        this.size = Math.floor(Math.random() * 3 + 8);
        this.color = color;
    
        this.speedY = Math.random() * 2 - 2;
        this.speedX = Math.round((Math.random() - 0.5) * 10);
    
        //Updating the ball Particle
        this.update = () => {
            //Decrease size if this.size is greater then .2
    
            if (this.size > .2) {
                this.size -= .1;
            }
            this.y += this.speedY;
            this.x += this.speedX;
        }
    
        //rendering Ball particles on the canvas
        this.draw = () => {
            context.fillStyle = this.color;
            context.beginPath();
            context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            context.fill();
        }
    }

//making function for our black shapes , which are acting as a bomb

function blackshape() {

    //getting random coordinates and size but giving specific color black to it 
    
        this.x = Math.floor(Math.random() * window.innerWidth);
        this.y = Math.floor(window.innerHeight);
        this.size = Math.floor((Math.random() * 10) + 40);
        this.color = `black`;
    
        this.speedY = 10;
        this.speedX = Math.round((Math.random() - 0.5) * 4);
    
        //Updating out black shape Position
    
        this.update = () => {
            this.y -= this.speedY;
            this.x += this.speedX;
            this.speedY -= .1;
        }
    
        // console.log(check)
        //so if we choose circle in (choose.html) then check will be true
        //and on the bases of that first condition of if statement will work
        //similarly in else the box shapes will be given
    
        this.draw = () => {
            if(check==='true'){
            //making styling of black ball
            context.fillStyle = this.color;
            context.beginPath();
            context.lineWidth = 6;
            context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            context.strokeStyle = 'red';
            context.stroke();
            context.fill();
            // console.log("blackcircle")
            }
            else{
            //making styling for black box
            context.fillStyle = this.color;
            const width=90;
            const height=90;
            context.fillRect(this.x,this.y,width,height);
            // console.log("blackBox")
            }
        }
    }
    
//making empty array for functions

let ballArray = [];
let ballParticlesArray = [];
let blackshapeArray = [];
let strikeCount = 1;
let lastBallSlice;


function renderBalls() {
    for (let i = 0; i < ballArray.length; i++) {
        //here we are making the shapes at specific indexes by draw()
        //and using update() to change its position
        ballArray[i].draw();
        ballArray[i].update();

        //Detecting Collision of Mouse Position and Ball Position
        //by using math.hypot(it gives hypotenus of points ) we can find vector distance between two points
        //so here also we are checking coordinates

        let distanceBetweenMouseAndBall = Math.hypot(mouseX - ballArray[i].x, mouseY - ballArray[i].y)

        //If Mouse is on the ball then Collision happened as below statement

        if (distanceBetweenMouseAndBall - ballArray[i].size < 1) {

            //Rendering Ball Particles which are needed to be created on collision
            //we give values to the arguments of ballparticle function 
            for (let index = 0; index < 8; index++) {
                ballParticlesArray.push(new BallParticles(ballArray[i].x, ballArray[i].y, ballArray[i].color));
            }
            // updating the score by 10 if this condition hhappens
            let scoreToUpdate = +10;
            updateScore(scoreToUpdate)

            //Splicing the ball from the array so that it should not be shown
            ballArray.splice(i, 1);
            i--;
            return
        }

        //Splice the ball if it reached the bottom of the screen

        if (ballArray[i].y > window.innerHeight + 10) {
            ballArray.splice(i, 1);
            i--;
        }
    }
}

//function for rendering our black shapes

function renderblackshapes() {
    for (let i = 0; i < blackshapeArray.length; i++) {
        //here we are making the black shapes at specific indexes by draw()
        //and using update() to change its position
        blackshapeArray[i].draw();
        blackshapeArray[i].update();

        //Detection Collision of Mouse Position and Ball Position
        //same logic as we done earlier
        let distanceBetweenMouseAndEnemy = Math.hypot(mouseX - blackshapeArray[i].x, mouseY - blackshapeArray[i].y)

        //If Mouse is on the ball i.e Collision
        if (distanceBetweenMouseAndEnemy - blackshapeArray[i].size < 1) {
        
        //so now when collision happen with black then time pause for 5 sec
     
            if (isGamePause) {
                return
            }
            //Clearing Canvas when user touches the black 

            ballArray = [];
            ballParticlesArray = [];
            isGamePause = true;
            bomb--;
            liveremaing.innerText=bomb;

            //Count Down for 5 Seconds will get activated
            alertTimer();
            //20 points will be decreased from score
            updateScore(-20);
            bombTouchSound.play();
            //Splicing the ball from the array
            blackshapeArray.splice(i, 1);
            i--;
            return
        }

        //Splice the bomb when reached the bottom of the screen

        if (blackshapeArray[i].y > window.innerHeight + 10) {
            blackshapeArray.splice(i, 1);
            i--;
        }
    }
}

//function for rendering ball particles

function renderBallParticles() {
    for (let i = 0; i < ballParticlesArray.length; i++) {
        ballParticlesArray[i].draw();
        ballParticlesArray[i].update();

        //If ball particles size is too small splice from the array
        if (ballParticlesArray[i].size <= .2) {
            ballParticlesArray.splice(i, 1);
            i--;
        }
    }
}

//in this array below we have given random number which will further defines that 
//how many balls are needed to be rendered at single time 

let numberOfBallsToRender = [2, 1, 2, 3, 2, 1, 2, 1, 3, 3, 2, 1, 2, 3, 1, 1, 2, 2, 1, 2];

//SetInterval to render the balls on an interval of 1 second

const startRenderingBallsInterval = () => {
    let interval = setInterval(() => {
        //Clear the interval if the game is end.
        if (isGameEnd) {
            clearInterval(interval)
            return;
        }
        //Return if the game is pause
        if (isGamePause) {
            return
        }
        //here we are picking up any random index from array 

        const numberOfBalls = Math.round(Math.random() * numberOfBallsToRender.length);
        let indexOf = numberOfBallsToRender[numberOfBalls];

        //If the index generated is greater then length of numberOfBallsToRender array, throw a bomb
        //as we are multiplying length of array with a random number

        if (numberOfBalls >= Math.floor(numberOfBallsToRender.length / 2)) {
            blackshapeArray.push(new blackshape())
        }

        //Number of balls to be rendered on the canvas using for loop
        //we are pushing new ball in ballarray 
        for (let i = 0; i < indexOf; i++) {
            ballArray.push(new Ball())
        }
        //and all this happens after every 1 sec
    }, 1000)
}

//Using Visibility change to prevent rendering balls when the tab is inactive

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        isGamePause = false;
    } else {
        isGamePause = true;
    }

})

//Animate function to render everything at single

function animate() {
    backgroundImage;

    // context.fillStyle = 'white';
    // context.fillRect(0, 0, canvas.width, canvas.height);
    background()
    renderBalls();
    renderBallParticles();
    renderblackshapes();
    renderMouseLines();
    //Cancel animation when the game is end.
    if (isGameEnd) {
        cancelAnimationFrame(animationId);
        return
    }
    animationId = requestAnimationFrame(animate);
}

//Importing Sounds form sound source folder 

const gameStartSound = new Audio('./Sound_Source/Game-start.wav')
const gameEndSound = new Audio('./Sound_Source/Game-over.wav')
const bombTouchSound = new Audio('./Sound_Source/gank.wav')
const timeBeepSound = new Audio('./Sound_Source/time-beep.wav')
const buttonPushSound = new Audio('./Sound_Source/ui-button-push.wav')

let isSwordSoundPlaying = false;

//Sword Sound Effect

const playSwordSound = ()=>{
    //Generating a random audio by random number as per source sound name

    let swordAudio = new Audio(`./Sound_Source/Sword_Sound_Effects/Sword-swipe-${Math.floor(Math.random() * 6) + 1}.wav`);

    swordAudio.play();

    //Setting this true to not to play more audio before this ends.

    isSwordSoundPlaying = true;
    swordAudio.addEventListener('ended',()=>{ 
        isSwordSoundPlaying = false;
    })

}

//Trying to fetch high score from the local storage, if not use 0;

let highScore = localStorage.getItem('highScore') || 0;

//updating high score through getting it from local storage
document.getElementById('highScore').innerHTML = highScore;
document.getElementById('homeHighScore').innerHTML = highScore;


//Function to update score in the game

const updateScore = (presentscore) => {
    //If presentscore is in negative them setting the score directly to 0 , which can br minimum value
    if (presentscore + score < 0) {
        score = 0;
        return
    }
    //adding our points in score

    score = score + presentscore;
    //checking and updating high score its greatest
    if (score > highScore) {
        localStorage.setItem('highScore', score);
        document.getElementById('highScore').innerHTML = score;
        document.getElementById('homeHighScore').innerHTML = score;
    }
    //updating our score in html page
    document.getElementById('score').innerHTML = score;
}
//invocking our function with giving 0 in its argument

updateScore(0);

//initialization for slice mouse and touch effects 

//although here I have given "mouse" kind of variables and initialization 
//because in many functions above i have given these keywords only so 
// i will be using clicking or touching functions in if statement but
//store those in same keywords and arrays only

let prevMouseX = 0;
let prevMouseY = 0;
let mouseX = 0;
let mouseY = 0;
let isMouseClicked = false;
let linesArray = [];

//function to make slice function active

function renderMouseLines() {
    for (let i = 0; i < linesArray.length; i++) {
        //making white line of this splice 
        context.strokeStyle = 'white';
        context.beginPath();
        
        context.moveTo(linesArray[i].x, linesArray[i].y);
        context.lineTo(linesArray[i].pMouseX, linesArray[i].pMouseY);
        context.stroke();
        context.lineWidth= 4;
        context.closePath();
    }
    //If the length of this array is greater then 4 splice the first object of this array using shift();

    if (linesArray.length > 4) {
        if (!isSwordSoundPlaying) {
            playSwordSound();  
        }
        linesArray.shift();
        linesArray.shift();
    }
}


//here we that checking the screen width of the devices because in laptops and computer touch didin't work
///where as in mobiles right click swap didn't works of after some recoginzation I concluded that devises
//with width more than 1200px will take mouse inputs and devices below it are touch devices

var screenWidth = screen.width;
console.log(screenWidth)

//trying to change the width of screen in variable while onloading
//but still we have to refresh it once to switch mode

 function width(){
    screenWidth=screen.width;
    console.log('width working')
    location.reload()
 }
 
//adding if statement for both devices

if(screenWidth>1200){

    //this is for desktop mouse version
    //so here are event listener to detect when left button of mouse is clicked
 console.log('working for mouse')
canvas.addEventListener('mousedown', (e) => {
    prevMouseX = mouseX;
    prevMouseY = mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseClicked = true;
})

//When mouse is moving

canvas.addEventListener('mousemove', (e) => {
    if (isMouseClicked) {
        prevMouseX = mouseX;
        prevMouseY = mouseY;
        mouseX = e.clientX;
        mouseY = e.clientY;
        linesArray.push({x: mouseX,y:mouseY,pMouseX: prevMouseX,pMouseY: prevMouseY})
    }
})

//When the mouse button is released

canvas.addEventListener('mouseup', () => {
    mouseX = 0;
    mouseY = 0;
    linesArray = [];
    isMouseClicked = false;
})

//When the mouse is out of the tab or window

canvas.addEventListener('mouseout', () => {
    mouseX = 0;
    linesArray = [];
    mouseY = 0;
    isMouseClicked = false;
})
}

//this else statement is for touch response

else{
    console.log('working for touch')
canvas.addEventListener('touchstart', (e) => {
    prevMouseX = mouseX;
    prevMouseY = mouseY;
    mouseX = e.touches[0].clientX;
    mouseY = e.touches[0].clientY;
    isMouseClicked = true;
})

canvas.addEventListener('touchmove', (e) => {
    if (isMouseClicked) {
        prevMouseX = mouseX;
        prevMouseY = mouseY;
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        linesArray.push({ x: mouseX, y: mouseY, pmouseX: prevMouseX, pmouseY: prevMouseY });
    }
})

canvas.addEventListener('touchend', () => {
    mouseX = 0;
    mouseY = 0;
    linesArray = [];
    isMouseClicked = false;
})

canvas.addEventListener('touchcancel', () => {
    mouseX = 0;
    linesArray = [];
    mouseY = 0;
    isMouseClicked = false;
})
}



