/* Event Listeners */
document.querySelector("#clickHere").addEventListener("click", () => { game.addToGold(game.clickPower) });

let game = { // objeto onde ficá todos os nossos dados a serem salvos
    currentGold: 0,                         // Gold Atual
    totalGoldEarned: 0,                     // Gold TOTAL já adquirido, mesmo gastado não diminui
    goldPerSecond: 0,                       // Gold Por Segundo
    clickPower: 1,                          // Quantia de gold ganha por click

    addToGold: function (amount) {            // Adiciona ao gold atual a quantia passada
        this.currentGold += amount;         // atualiza o valor do gold atual
        this.totalGoldEarned += amount;     // atualiza o valor do gold total já adquirido
        display.updateGold();               // Executa a função dentro do objeto display que irá atualizar na tela o valor do gold atual
    },
};

let display = { // Objeto onde ficá todo que será mostrado na tela
    updateGold: function () {
        document.querySelector('#totalGold').innerText = game.currentGold
        document.title = game.currentGold + " - The Waystone Clicker"
    }
};

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
        }
    }
}
