const shapeone =document.getElementById('shapeone');
const shapetwo =document.getElementById('shapetwo');

var check=true;
console.log('hi')
shapeone.addEventListener('click',()=>{
    check=true;
    console.log(check)
    localStorage.setItem('check',check)
    location.href='game.html'
})

shapetwo.addEventListener('click',()=>{
    check=false;
    console.log(check)
    localStorage.setItem('check',check)
    location.href='game.html'
})