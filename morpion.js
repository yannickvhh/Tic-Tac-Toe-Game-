let joueur = 'blue';
let tableau = Array(9).fill(null);
let scoreBlue = 0;
let scoreRed = 0;
let finJeu = false

document.addEventListener("DOMContentLoaded", () => {
    createGrid();
});

function createGrid(){//cretion des 9tuiles morpion avc une  bouclefor
	const gameGrid=document.getElementById("gameGrid");
	gameGrid.innerHTML=" ";
	for(let i=0; i< 9;i++){
		const cell=document.createElement("div");
		cell.classList.add("case");
		cell.dataset.index=i;
		cell.addEventListener("click", ()=>makeMove(i));
		gameGrid.appendChild(cell);   
		tableau[i] = null;
	}
    finJeu = false
}
function makeMove(index) {//fnctio tours pour jouer avec verif de fin de jeu/ verif si case deja joué ou case vide + si conditio de victoire, fin de partie+msg victoire
    if (finJeu) {
        return; 
    }
    if (tableau[index] !== null) {
        document.getElementById("message").textContent = "Case déjà prise!";
        return;
    }
    tableau[index] = joueur;
    const cell = document.querySelector(`.case[data-index='${index}']`);
    cell.style.backgroundColor = joueur;
    if (checkWin()) {
        document.getElementById("message").textContent = `Le joueur ${joueur} a gagné!`;
        updateScore();
        finJeu = true;    
        return;
    }
    joueur= (joueur === 'blue') ? 'red' : 'blue';
    document.getElementById("message").textContent = `Tour du joueur ${joueur}`;
}

function checkWin() {//conditions victoire
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return tableau[a] && tableau[a] === tableau[b] && tableau[a] === tableau[c];
    });
}
function updateScore() {//fnct pr augmnter le score en cas de victoire
    if (joueur === 'blue') {
        scoreBlue++;
        document.getElementById("scoreBlue").textContent=scoreBlue;
    } else {
        scoreRed++;
        document.getElementById("scoreRed").textContent =scoreRed;
    }
}

function resetGame(){//fnc init jeu
	tableau.fill(null);
	joueur='blue';
	document.getElementById("message").textContent='Joueur Bleu commence';
	createGrid();}