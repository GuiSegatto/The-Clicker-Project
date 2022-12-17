

let button = document.querySelector('#buyHero');


button.addEventListener('click', buyAnimation);

function buyAnimationDelay () {
    
}

const timeout = setTimeout(buyAnimation)


function buyAnimation () {
    button.classList.add('glow')
    setTimeout(() => {
        button.classList.remove('glow');
    }, 120)
   
}

