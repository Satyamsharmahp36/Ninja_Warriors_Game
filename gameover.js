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