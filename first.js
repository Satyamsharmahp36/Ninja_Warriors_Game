// catching our inputs by player

let button=document.getElementById('button');
let game=document.getElementById('game');
let userName=document.getElementById('name')

// catching the audio using audio and its location 

const backsoun = new Audio('./Sound_Source/backgroundsound.mp3')
const clicksound = new Audio('./Sound_Source/buttonclick.wave')

//making a function so that when we click on enter button then redirect to next instruction page by location href

//also storing the username input in localstorage so we can access that inn future codes

//also add click sound onclicking button

//ans also giving alert if name is not entered

button.addEventListener('click',()=>{
    if(userName.value){
        localStorage.setItem('userName', userName.value)
        location.href='instruction.html'
        clicksound.play()
        console.log('entered')
    }
    else{
        alert("Please enter some username")
    }
    
})

//adding a background sound on page whrn it loads

window.onload=()=>{
    backsoun.play()
}

