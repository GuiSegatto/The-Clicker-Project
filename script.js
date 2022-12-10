



// Gold - Dinheiro
let gold = 0;

// Cursores
let cursorCost = 15;
let cursorAmount = 0;


/* 
    Event listeners
*/

// Toda vez que clickarmos no botão ele executa a função e adicionará 1 de gold
document.querySelector("#clickHere").addEventListener("click",() =>{addToGold(1)});
// Toda vez que clickarmos no botão de comprar o cursor executa a função de comprar o cursor
document.querySelector("#buyCursor").addEventListener("click", buyCursor)

// Soma a quantidade passada ao nosso total de gold 
function addToGold(amount){
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

setInterval(function() {   // função de "DPS"
    gold = gold + cursorAmount // para aumentar podemos adicionar um "* (y)"
    document.querySelector("#totalGold").innerHTML = gold // atualiza o valor do gold a cada .....
}, 1000) // 1000ms = 1s
