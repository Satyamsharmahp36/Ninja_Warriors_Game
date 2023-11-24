// catching our div's

const playagain = document.getElementById('playagaini')
const mainmenu = document.getElementById('menui')

// redirecting to respective buttons by clicking on called div's

playagain.addEventListener('click',()=>{
    location.href='game.html'
})

mainmenu.addEventListener('click',()=>{
    location.href='index.html'
})

// using onload to give background sound after the page loads

const backsounds = new Audio('./Sound_Source/backgroundsound.mp3')

window.onload=()=>{
    backsounds.play()
}

//making random statements for ending page in an array

let randomwords = ["You Can Do Better","Keep It Up","Amazing","Your Accuracy Is Good","Well Played",
"Good Job","Game on, champions!","Unleash your potential!","Conquer the challenges ahead!"];

//making a function same as we did in zombie shoot to get random number between 2 numbers
//to that we can use this to get random message 

function getRandomInt(min,max){
    min =Math.ceil(min);
    max=Math.ceil(max);
    return Math.floor(Math.random()*(max-min)) + min
}

console.log(randomwords[getRandomInt(0,8)])

//updating message in the html page throught innerhtml

document.getElementById('randomMessage').innerHTML=randomwords[getRandomInt(0,8)];
