let button=document.getElementById('button');
const clicksound = new Audio('./Sound_Source/click.wave')
button.addEventListener('click',()=>{
    let userName=document.getElementById('name').value;
    localStorage.setItem('userName', userName)
    location.href='instruction.html'
    clicksound.play()
})

let game=document.getElementById('game');



