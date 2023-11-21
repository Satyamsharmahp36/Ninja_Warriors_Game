let button = document.getElementById('button')
button.addEventListener('click',()=>{
    location.href='game.html'
})
let username=document.getElementById('username')
let nameuser=localStorage.getItem('userName')
username.innerHTML=nameuser;