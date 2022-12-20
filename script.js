/* Event Listeners */
document.querySelector("#clickHere").addEventListener("click", () => { game.addToGold(game.clickPower), display.clicked() });




let game = {
    currentGold: 0,                         // Gold Atual
    totalGoldEarned: 0,                     // Gold TOTAL já adquirido, mesmo gastado não diminui
    clickPower: 1,                          // Quantia de gold ganha por click

    addToGold: function (amount) {            // Adiciona ao gold atual a quantia passada
        this.currentGold += amount;         // atualiza o valor do gold atual
        this.totalGoldEarned += amount;     // atualiza o valor do gold total já adquirido
        display.updateGold();               // Executa a função dentro do objeto display que irá atualizar na tela o valor do gold atual
    },

    getGoldPerSecond: function () {
        let goldPerSecond = 0
        for (index = 0; index < hero.name.length; index++) { // o index começa no 0, enquanto o index for menor que o tamanho de name, executa e aumenta 1 no numero do index
            goldPerSecond += hero.baseIncome[index] * hero.level[index] // irá percorrer nosso array atribuindo ao GpS a quantia de gold que o heroi dá X o seu level
        };
        return goldPerSecond; // retorna essa variavel para o lugar onde a função foi chamada
    },
};



let display = {
    updateGold: function () {
        document.querySelector('#currentGold').innerText = game.currentGold;
        document.querySelector('#goldPerSecond').innerText = game.getGoldPerSecond();
        document.title = game.currentGold + " - The Waystone Clicker";
    },

    updateShop: function() {
        document.querySelector('#heroShop').innerHTML = "";
        for (index = 0; index < hero.name.length; index++) {
            document.querySelector('#heroShop').innerHTML += '<div class="hero-wrapper"><div class="hero-img" id="heroImage">hero img</div><div class="hero-name-wrapper"><h3>'+hero.name[index]+'</h3><div class="hero-upgrades">0 0 0 0 0</div></div><div class="hero-info"><p class="hero-level">Level: <span>'+hero.level[index]+'</span></p><p class="hero-income">Base Income: <span>'+hero.baseIncome[index]+'</span></p></div><button class="buy-hero animate-'+index+'" onclick="hero.purchaseHero('+index+')">Level-Up<div>'+hero.cost[index]+'</div></button></div>'
        }
    },

    buyAnimation: function (index) {
        let button = document.querySelector(`.animate-${index}`);
        button.classList.add('glow')
        setTimeout(() => {
            button.classList.remove('glow');
        }, 120)
    },

    clicked: function () {
        let clickHere = document.querySelector(".click-here-text")
        clickHere.classList.add('clicked')
        setTimeout(() => {
            clickHere.classList.remove('clicked')
        }, 120)
    }

};

// Gera o Gold Por Segundo
setInterval(function () {
    game.currentGold += game.getGoldPerSecond();
    game.totalGoldEarned += game.getGoldPerSecond;
    display.updateGold();
}, 1000)


/* 
    Quando carregar a guia irá executar essas funções
*/
window.onload = function () {
    loadGame();
    display.updateGold();
    display.updateShop();
}

/* 
    SAVE GAME
*/
function saveGame() {
    let gameSave = { 
        currentGold: game.currentGold,
        totalGoldEarned: game.totalGoldEarned,
        clickPower: game.clickPower,
        heroCost: hero.cost,
        heroLevel: hero.level,
        heroBaseIncome: hero.baseIncome,
    }
    localStorage.setItem("gameSave", JSON.stringify(gameSave)); 
}
function loadGame() {
    let savedGame = JSON.parse(localStorage.getItem("gameSave")); 
    if (localStorage.getItem("gameSave") !== null) { 
        if (typeof savedGame.currentGold !== "undefined") game.currentGold = savedGame.currentGold; 
        if (typeof savedGame.totalGoldEarned !== "undefined") game.totalGoldEarned = savedGame.totalGoldEarned;
        if (typeof savedGame.clickPower !== "undefined") game.clickPower = savedGame.clickPower;
        if (typeof savedGame.heroCost !== "undefined") hero.cost = savedGame.heroCost;
        if (typeof savedGame.heroLevel !== "undefined") hero.level = savedGame.heroLevel;
        if (typeof savedGame.heroBaseIncome !== "undefined") hero.baseIncome = savedGame.heroBaseIncome;
    }
}

// Salva o jogo a cada 60 segundos
setInterval(function () {
    saveGame();
}, 60000) // 60 secs


// Previne que usuario use ctrl + S que abriria o save no navegador e salva executa a função de save ao invés disso
document.addEventListener("keydown", function (event) { // tecla pressionada o event registra qual foi a tecla
    if (event.ctrlKey && event.key == "s") { // se o CTRL e o S forem apertados
        event.preventDefault(); // previne que abra a janela do browser de save
        saveGame(); // salve o jogo
    }
}, false)

// Reseta o jogo
function resetGame() {
    if (confirm("Tem certeza que deseja resetar o save do jogo? \n \nATENÇÃO: Isso não trará nenhum benificio adicional")) {
        if (confirm("VOCÊ TEM ABSOLUTA CERTEZA QUE QUER RESETAR O SEU SAVE ???????")) {
        let gameSave = {};
        localStorage.setItem("gameSave", JSON.stringify(gameSave));
        location.reload(); // Garante que assim que confirmar irá recarregar a pagina assim executando a função "window.onload"
    }
    }
}


let hero = {
    name: [
        "Fox",
        "Eric",
        "Nikasha",
    ],

    cost: [
        10,
        100,
        1000,
    ],

    level: [
        0, 0, 0
    ],
    baseIncome: [
        1, 10, 100
    ],

    purchaseHero: function (index) {                                    
        if (game.currentGold >= this.cost[index]) {                     
            game.currentGold -= this.cost[index];                     
            this.level[index] += 1;                                   
            this.cost[index] = Math.round(this.cost[index] * 1.15);  // aumenta o custo do herói basicamente a cada 5 herois dobra o preço
            display.updateGold();
            display.updateShop();
            display.buyAnimation(index);
            
        }
    }
}
