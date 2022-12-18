/* Event Listeners */
document.querySelector("#clickHere").addEventListener("click", () => { game.addToGold(game.clickPower) });
document.getElementById("buyHero").addEventListener("click", () => { hero.purchaseHero(0) })

/* 
    Objeto onde ficá todos os nossos dados a serem salvos
    E as funcionalidades do jogo
*/
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
            goldPerSecond += hero.income[index] * hero.level[index] // irá percorrer nosso array atribuindo ao GpS a quantia de gold que o heroi dá X o seu level
        };
        return goldPerSecond; // retorna essa variavel para o lugar onde a função foi chamada
    },
};


/* 
    Objeto onde ficá todo que será mostrado na tela
*/
let display = {
    updateGold: function () {
        document.querySelector('#currentGold').innerText = game.currentGold;
        document.querySelector('#goldPerSecond').innerText = game.getGoldPerSecond();
        document.title = game.currentGold + " - The Waystone Clicker";
    },
    updateHeroInfo: function () {
        document.getElementById('heroLevel').innerText = hero.level[0];
        document.getElementById('heroIncome').innerText = hero.level[0] * hero.income[0];
        document.getElementById('heroCurrentPrice').innerText = hero.cost[0];
    }
};

// Função de gold por segundo
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
    display.updateHeroInfo();
}



/* 
    SAVE GAME
*/

// Salva o jogo
function saveGame() {
    let gameSave = { // criamos um objeto que irá guardar nossos dados
        currentGold: game.currentGold,
        totalGoldEarned: game.totalGoldEarned,
        clickPower: game.clickPower,
        heroCost: hero.cost,
        heroLevel: hero.level,
        heroIncome: hero.income,
    }
    localStorage.setItem("gameSave", JSON.stringify(gameSave)); // salva através de cookies em um arquivo JSON de um modo string
}

// Carrega o jogo
function loadGame() {
    let savedGame = JSON.parse(localStorage.getItem("gameSave")); // busca o arquivo JSON "gameSave"
    if (localStorage.getItem("gameSave") !== null) { // se o save existir então...
        if (typeof savedGame.currentGold !== "undefined") game.currentGold = savedGame.currentGold; // previne erros e garante que não irá atualizar o valor do gold se o valor não estiver definido
        if (typeof savedGame.totalGoldEarned !== "undefined") game.totalGoldEarned = savedGame.totalGoldEarned;
        if (typeof savedGame.clickPower !== "undefined") game.clickPower = savedGame.clickPower;
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


/* 
    Onde ficará nossos personagens que podem ser adquiridos
*/
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

    purchaseHero: function (index) {                                     // Função para comprar os heróis baseado na posição do index
        if (game.currentGold >= this.cost[index]) {                     // Se o preço for menor que o gold atual então...
            game.currentGold -= this.cost[index];                      // Diminui o valor do gold atual com opreço do heroi
            this.level[index] += 1;                                   // Aumenta 1 level do herói
            this.cost[index] = Math.round(this.cost[index] * 1.15);  // aumenta o custo do herói basicamente a cada 5 herois dobra o preço
            display.updateGold();
            display.updateHeroInfo();
        }
    }
}
