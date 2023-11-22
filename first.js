// catching our inputs by player

let button=document.getElementById('button');
let game=document.getElementById('game');


// catching the audio using audio and its location 

const backsoun = new Audio('./Sound_Source/backgroundsound.mp3')
const clicksound = new Audio('./Sound_Source/buttonclick.wave')

//making a function so that when we click on enter button then redirect to next instruction page by location href

//also storing the username input in localstorage so we can access that inn future codes

//also add click sound onclicking button

button.addEventListener('click',()=>{
    let userName=document.getElementById('name').value;
    localStorage.setItem('userName', userName)
    location.href='instruction.html'
    clicksound.play()
})

//adding a background sound on page whrn it loads

window.onload=()=>{
    backsoun.play()
}