const shapeone =document.getElementById('shapeone');
const shapetwo =document.getElementById('shapetwo');

//here we are making variable check which changes when we click on options
//this check get updated in localstorage and then we get redirected to game page

var check=true;
console.log('hi')

// for shapeone
shapeone.addEventListener('click',()=>{
    check=true;
    console.log(check)
    localStorage.setItem('check',check)
    location.href='game.html'
})

// for shapetwo
shapetwo.addEventListener('click',()=>{
    check=false;
    console.log(check)
    localStorage.setItem('check',check)
    location.href='game.html'
})

// catching the audio and playing it on "onload"

const backsoundss = new Audio('./Sound_Source/backgroundsound.mp3')

window.onload=()=>{
    backsoundss.play()
}