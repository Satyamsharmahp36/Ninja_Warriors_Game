// catching user button form html document

let button = document.getElementById('button')
let username=document.getElementById('username')

//getting the username form localstorage

let nameuser=localStorage.getItem('userName')

// update the span with id username with innhtml to give it playername

username.innerHTML=nameuser;

// directing to game page on clicking the button

button.addEventListener('click',()=>{
    location.href='chooseshape.html'
})

// catching the audio and playing it on "onload"

const backsound = new Audio('./Sound_Source/backgroundsound.mp3')

window.onload=()=>{
    backsound.play()
}

