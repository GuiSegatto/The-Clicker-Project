/* Event Listeners */
document.querySelector("#clickHere").addEventListener("click", () => { game.addToGold(game.clickPower), display.clicked() });




let game = {
    currentGold: 0,                         // Gold Atual
    totalGoldEarned: 0,                     // Gold TOTAL já adquirido, mesmo gastado não diminui
    clickPower: 1,                          // Quantia de gold ganha por click
    totalClicks: 0,

    addToGold: function (amount) {            // Adiciona ao gold atual a quantia passada
        this.currentGold += amount;         // atualiza o valor do gold atual
        this.totalGoldEarned += amount;     // atualiza o valor do gold total já adquirido
        display.updateGold();               // Executa a função dentro do objeto display que irá atualizar na tela o valor do gold atual
    },

    getGoldPerSecond: function () {
        let goldPerSecond = 0
        for (index = 0; index < hero.name.length; index++) { // o index começa no 0, enquanto o index for menor que o tamanho de name, executa e aumenta 1 no numero do index
            goldPerSecond += hero.income[index] * hero.level[index] // irá percorrer nosso array atribuindo ao GpS a quantia de gold que o heroi dá X o seu level
        };
        return goldPerSecond; // retorna essa variavel para o lugar onde a função foi chamada
    },

    getHeroGoldPerSecond: function (index) {
        let currentGpS = 0
        currentGpS = hero.level[index] * hero.income[index]
        return currentGpS
    },

    getNextLevelGoldPerSecond: function (index) {
        let nextLevelGps = 0
        let nextLevel = 0
        nextLevel = hero.level[index] + 1
        nextLevelGps = nextLevel * hero.income[index]
        return nextLevelGps
    }
};



let display = {
    updateGold: function () {
        document.querySelector('#currentGold').innerText = game.currentGold;
        document.querySelector('#goldPerSecond').innerText = game.getGoldPerSecond();
        document.title = game.currentGold + " - The Waystone Clicker";
    },

    updateShop: function () {
        document.querySelector('#heroShop').innerHTML = "";
        for (index = 0; index < hero.name.length; index++) {
            document.querySelector('#heroShop').innerHTML += '<div class="hero-wrapper tooltip"><span class="tooltip-text"><p class="hero-name">' + hero.name[index] + '</p><p class="current-level">Current Level: <span>' + hero.level[index] + '</span></p><br><p class="current-income">Current Income: <span>' + game.getHeroGoldPerSecond(index) + '</span></p><p class="next-level-income">Next Level Income:<span>' + game.getNextLevelGoldPerSecond(index) + '</span></p></span><div class="hero-img" id="heroImage">hero img</div><div class="hero-name-wrapper"><h3>' + hero.name[index] + '</h3><p class="hero-level">Level: <span>' + hero.level[index] + '</span></p></div><div class="hero-info"></div><button class="buy-hero animate-' + index + '" onclick="hero.purchaseHero(' + index + ')">Level-Up<div>' + hero.cost[index] + '</div></button></div>'
        }
    },

    updateUpgrades: function () {
        document.querySelector("#upgradeContainer").innerHTMLHTML = "";
        for (index = 0; upgrade.name.length; index++) {
            if (!upgrade.purchased[index]) {
                if (upgrade.type[index] == "hero" && hero.level[upgrade.buildingIndex[index]] >= upgrade.requirement[index]) {
                    document.querySelector("#upgradeContainer").innerHTML += '<img src="images/'+upgrade.image[index]+'" title="'+upgrade.name[index]+' &#10; '+upgrade.description[index]+' &#10; ('+upgrade.cost[index]+' gold)" onclick="upgrade.purchase('+index+')">';

                }


                // essa condição ativa caso a anterior não tenha sido valida, no caso ativa a condição para o proximo tipo de upgrade
/*                 else if (upgrade.type[index] == "click" && game.totalClicks > = upgrade.requirement[index]) {
                    
                } */
            }
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
    },

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
        totalClicks: game.totalClicks,
        heroCost: hero.cost,
        heroLevel: hero.level,
        heroIncome: hero.income,
    }
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
}
function loadGame() {
    let savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if (localStorage.getItem("gameSave") !== null) {
        if (typeof savedGame.currentGold !== "undefined") game.currentGold = savedGame.currentGold;
        if (typeof savedGame.totalGoldEarned !== "undefined") game.totalGoldEarned = savedGame.totalGoldEarned;
        if (typeof savedGame.clickPower !== "undefined") game.clickPower = savedGame.clickPower;
        if (typeof savedGame.totalClicks !== "undefined") game.totalClicks = savedGame.totalClicks;
        if (typeof savedGame.heroCost !== "undefined") hero.cost = savedGame.heroCost;
        if (typeof savedGame.heroLevel !== "undefined") hero.level = savedGame.heroLevel;
        if (typeof savedGame.heroIncome !== "undefined") hero.income = savedGame.heroIncome;
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
    income: [
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

let upgrade = {
    name: [
        "Iscas de Minhoca",
    ],
    description: [
        "Dobra a eficiencia de Nikasha",
    ],

    image: [
        "01.png"
    ],

    type: [
        "hero",
    ],
    cost: [
        10,
    ],
    heroIndex: [
        2,
    ],
    requirement: [
        1,
    ],

    bonus: [
        2, // dobro
    ],

    purchased: [
        false,
    ],

    purchase: function (index) {
        if (!this.purchased[index] && game.currentGold >= this.cost[index]) {// se não estiver comprado e se o gold atual for maior que o custo
            if (this.type[index] == "hero" && hero.level[this.heroIndex[index]] >= this.requirement[index]) { // se o tipo do upgrade for para um heroi e o level do heroi [posição do index] for maior que o requirimento
                game.currentGold -= this.cost[index];
                hero.income[this.buildingIndex[index]] *= this.bonus[index];
                this.purchased[index] = true;

                display.updateUpgrades();
                display.updateGold();


                // essa condição ativa caso a anterior não tenha sido valida, no caso ativa a condição para o proximo tipo de upgrade
                /*  } else if (this.type[index] == "click" && game.totalClicks >= this.requirement[index]) {
     
                 } */
            }
        }
    }
}