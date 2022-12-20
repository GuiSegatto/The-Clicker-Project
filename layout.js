

let button = document.querySelector('#buyHero');


button.addEventListener('click', buyAnimation);

const timeout = setTimeout(buyAnimation)


function buyAnimation () {
    button.classList.add('glow')
    setTimeout(() => {
        button.classList.remove('glow');
    }, 120)
   
}




let clickHere = document.querySelector(".click-here-text")

clickHere.addEventListener('click', clicked)

function clicked() {
    clickHere.classList.add('clicked')
    setTimeout(() => {
        clickHere.classList.remove('clicked')
    }, 120)
}
