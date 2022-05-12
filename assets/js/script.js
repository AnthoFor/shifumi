//Créer une liste avec trois éléments (Pierre, Feuille, Ciseaux). Ajouter un bouton « Shifumi ! ». Lorsque l'on clique sur « Shifumi ! », choisir un élément au hasard (Pierre, Feuille ou Ciseaux). Le comparer à l'élément choisi par le joueur pour voir qui a gagné entre l'humain et la machine.
//Bonus : Ajouter un compteur de victoires et de défaites et afficher le pourcentage de victoire contre l'ordinateur.
let humanWinCount =0;
let humanLooseCount = 0;
let numbTotalOfGame = 0;
let shifuArray = ['pierre', 'feuille', 'ciseaux'];
let humanWinRatio = 0;
let winEgalOrLoose = '';

//renvoi un nombre entier aléatoire entre 1 et 3
function randomFrom0to3() {
    return Math.floor(Math.random() * 3);
}
//en fonction de randomFrom0to3 déduis quel est le choix de l'ordinateur
function whichOneCompChoose() {
    let compNb = randomFrom0to3();
    let compChoice = '';
    switch (compNb) {
        case 0:
            compChoice = shifuArray[0];
            break;
        case 1:
            compChoice = shifuArray[1];
            break;
        case 2:
            compChoice = shifuArray[2];
            break;    
        default:
            break;
    }
    return compChoice;
}
// let choiceSelect = Array.from(document.getElementsByClassName('pushImg'));
// console.log(choiceSelect);
let choiceSelect = document.querySelectorAll('.pushImg');
choiceSelect.forEach(element => {
    element.addEventListener('click', (event) => {
    let choosedOneByComp = whichOneCompChoose();
    let choosedByHuman = event.target.id;
    numbTotalOfGame += 1;
    nbTotalGame.innerHTML = `Nombre total de partie(s) : ${numbTotalOfGame}`;
    if (choosedByHuman == choosedOneByComp) {
        winEgalOrLoose = 'Egalite!';
    } else if (choosedByHuman == 'pierre' && choosedOneByComp == 'feuille') {
        humanLooseCount += 1;
        winEgalOrLoose = 'Perdu :(';
        looseCount.innerHTML = `Nombre de defaite(s) : ${humanLooseCount}`;
    } else if (choosedByHuman == 'pierre' && choosedOneByComp == 'ciseaux') {
        humanWinCount += 1;
        winEgalOrLoose = 'Victoire!';
        winCount.innerHTML = `Nombre de victoire(s) : ${humanWinCount}`;
    } else if (choosedByHuman == 'feuille' && choosedOneByComp == 'pierre') {
        humanWinCount += 1;
        winEgalOrLoose = 'Victoire!';
        winCount.innerHTML = `Nombre de victoire(s) : ${humanWinCount}`;
    } else if (choosedByHuman == 'feuille' && choosedOneByComp == 'ciseaux') {
        humanLooseCount += 1;
        winEgalOrLoose = 'Perdu :(';
        looseCount.innerHTML = `Nombre de defaite(s) : ${humanLooseCount}`;
    } else if (choosedByHuman == 'ciseaux' && choosedOneByComp == 'pierre') {
        humanLooseCount += 1;
        winEgalOrLoose = 'Perdu :(';
        looseCount.innerHTML = `Nombre de defaite(s) : ${humanLooseCount}`;
    } else if (choosedByHuman == 'ciseaux' && choosedOneByComp == 'feuille') {
        humanWinCount += 1;
        winEgalOrLoose = 'Victoire!';
        winCount.innerHTML = `Nombre de victoire(s) : ${humanWinCount}`;
    }
    humanWinRatio =  (humanWinCount / numbTotalOfGame) * 100;
    percentOfWin.innerHTML = `Votre % de victoire : ${humanWinRatio.toPrecision(2)} %`; //Raccourci à 4 charactères
    //ajout des 2 choix (ordinateur-fromRight & humain-fromLeft)
    insertCompChoose.innerHTML = `
        <span id="resultText">${winEgalOrLoose}</span>
        <img src="assets/img/${choosedOneByComp}.png" class="fromRight" alt="Hands choosen by computer">
        <img src="assets/img/${choosedByHuman}.png" class="fromLeft" alt="Hands Choosen by human">
        `;
    let saberSound = document.getElementById('saberSound');
    setTimeout(() => {
        saberSound.play();
    }, 300);     
});
});

// affichage et fermeture des modales
rule.addEventListener('click', () => {
    rulesModal.style.display = "block";
})
closeModal.addEventListener('click', () => {
    rulesModal.style.display = "none";
})
stats.addEventListener('click', () => {
    statsModal.style.display = "block";
}) 
closeStatsModal.addEventListener('click', () =>{
    statsModal.style.display = "none";
})
startGame.addEventListener('click', () => {
    welcomeModal.style.display = "none";
    destinySound.play();
})

// window.addEventListener("DOMContentLoaded", (event) => {

// })
