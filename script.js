/* 
        Variaveis
*/



// Gold - Dinheiro
let gold = 0;

// Cursores
let cursorCost = 15;
let cursorAmount = 0;


/* 
    Event listeners
*/

// Toda vez que clickarmos no botão ele executa a função e adicionará 1 de gold
document.querySelector("#clickHere").addEventListener("click", () => { addToGold(1) });
// Toda vez que clickarmos no botão de comprar o cursor executa a função de comprar o cursor
document.querySelector("#buyCursor").addEventListener("click", buyCursor)
// quando clickarmos salva o save do jogo
document.querySelector("#saveGame").addEventListener("click", saveGame)

// Soma a quantidade passada ao nosso total de gold 
function addToGold(amount) {
    gold = gold + amount
    document.querySelector("#totalGold").innerHTML = gold;
}

// Criada a função de compra de cursores
function buyCursor() {
    if (gold >= cursorCost) { // se o gold for maior ou igual ao valor do cursor então....
        gold = gold - cursorCost; // define que o gold será o total de gold - o valor do cursor
        cursorAmount = cursorAmount + 1; // Adiciona +1 para o total de cursores
        cursorCost = Math.round(cursorCost * 1.15); // Atualiza o valor do cursor para 1.15 o que estavá custando e aredonda o valor final

        document.querySelector("#totalGold").innerHTML = gold // atualiza o total de gold
        document.querySelector("#cursorCost").innerHTML = cursorCost // atualiza o preço do cursor
        document.querySelector("#cursorAmount").innerHTML = cursorAmount // atualiza o total de cursores
    }
}

setInterval(function () {   // função de "DPS", atualiza o ouro ganho a cada 1 segundo
    gold = gold + cursorAmount // para aumentar podemos adicionar um "* (y)"
    document.querySelector("#totalGold").innerHTML = gold // atualiza o valor do gold a cada .....
}, 1000) // 1000ms = 1secs



/* 
        Save game
*/

// Auto save
setInterval(function () { // salva o jogo a cada 60 segundos
    saveGame();
}, 60000) //  60000ms = 60secs

// Load Function
function loadGame() {
    let savedGame = JSON.parse(localStorage.getItem("gameSave")); // busca o arquivo JSON "gameSave"
    if (typeof savedGame.gold !== "undefined") gold = savedGame.gold; // previne erros 
    if (typeof savedGame.cursorCost !== "undefined") cursorCost = savedGame.cursorCost;
    if (typeof savedGame.cursorAmount !== "undefined") cursorAmount = savedGame.cursorAmount;
}

// Save Function
function saveGame() {
    let gameSave = { // criamos um objeto que irá guardar nossos dados
        gold: gold, // Onde irá guardar: oque irá guardar 
        cursorCost: cursorCost,
        cursorAmount: cursorAmount,
    }
    localStorage.setItem("gameSave", JSON.stringify(gameSave)); // salva através de cookies em um arquivo JSON de um modo string
}

window.onload = function () { // quando a pagina carrega executa essa função
    loadGame(); // carrega o jogo
    document.querySelector("#totalGold").innerHTML = gold // atualiza o total de gold
    document.querySelector("#cursorCost").innerHTML = cursorCost // atualiza o preço do cursor
    document.querySelector("#cursorAmount").innerHTML = cursorAmount // atualiza o total de cursores
}