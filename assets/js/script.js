let humanWinCount = 0;
let humanLooseCount = 0;
let numbTotalOfGame = 0;
let shifuArray = ['pierre', 'feuille', 'ciseaux'];
let humanWinRatio = 0;
let winEgalOrLoose = '';
let soundOnOrOff = 1;
// UN CODE BIEN INDENTé = UN THIERRY-PAS-ENERVé
// UN CODE BIEN COMMENTé = UN THIERRY RELAXé :)

// fonction nommée de toggleSound ;)
const toggleSound = () => {
    soundChoice.classList.toggle('soundOff');
    soundChoice.classList.toggle('soundOn');
    if (soundChoice.classList.contains('soundOff')) {
        soundOnOrOff = 0;
    } else {
        soundOnOrOff = 1;
    }
}
//on click on eteint le son ;)
soundChoice.addEventListener('click', toggleSound);

//renvoi un nombre entier aléatoire entre 1 et 3
function randomFrom0to3() {
    return Math.floor(Math.random() * 3);
}
//en fonction de randomFrom0to3 déduit quel est le choix de l'ordinateur
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
// itérer un ByClassName comme un queryselectorAll, bon tip.

// Récupération de l'id de chaque class .pushImg afin de déduire le choix utilisateur
let choiceSelect = document.querySelectorAll('.pushImg');

choiceSelect.forEach(element => {
    element.addEventListener('click', (event) => {
        let choosedOneByComp = whichOneCompChoose();    //utilisation de la fonction pour le choix de l'ordi
        let choosedByHuman = event.target.id;           //affectation de l'id du span (pierre...) pour "comprendre" le choix du joueur
        numbTotalOfGame += 1;                           // Maj du nombre total de parties
        nbTotalGame.innerHTML = `Nombre total de partie(s) : ${numbTotalOfGame}`;
        //Grosse condition pour savoir si c'est une égalité, une victoire ou une défaite
        if (choosedByHuman == choosedOneByComp) {
            winEgalOrLoose = 'Egalite!';
        } else if (choosedByHuman == 'pierre' && choosedOneByComp == 'feuille') {
            humanLooseCount += 1;
            winEgalOrLoose = 'Perdu :(';
            if (soundOnOrOff == 1) {
                setTimeout(() => {
                    looseSound.play();
                }, 800);}
            looseCount.innerHTML = `Nombre de defaite(s) : ${humanLooseCount}`;
        } else if (choosedByHuman == 'pierre' && choosedOneByComp == 'ciseaux') {
            humanWinCount += 1;
            winEgalOrLoose = 'Victoire!';
            if (soundOnOrOff == 1) {
                setTimeout(() => {
                    victorySound.play();
                }, 800);}
            winCount.innerHTML = `Nombre de victoire(s) : ${humanWinCount}`;
        } else if (choosedByHuman == 'feuille' && choosedOneByComp == 'pierre') {
            humanWinCount += 1;
            winEgalOrLoose = 'Victoire!';
            if (soundOnOrOff == 1) {
                setTimeout(() => {
                    victorySound.play();
                }, 800);}
            winCount.innerHTML = `Nombre de victoire(s) : ${humanWinCount}`;
        } else if (choosedByHuman == 'feuille' && choosedOneByComp == 'ciseaux') {
            humanLooseCount += 1;
            winEgalOrLoose = 'Perdu :(';
            if (soundOnOrOff == 1) {
                setTimeout(() => {
                    looseSound.play();
                }, 800);}
            looseCount.innerHTML = `Nombre de defaite(s) : ${humanLooseCount}`;
        } else if (choosedByHuman == 'ciseaux' && choosedOneByComp == 'pierre') {
            humanLooseCount += 1;
            winEgalOrLoose = 'Perdu :(';
            if (soundOnOrOff == 1) {
                setTimeout(() => {
                    looseSound.play();
                }, 800);}
            looseCount.innerHTML = `Nombre de defaite(s) : ${humanLooseCount}`;
        } else if (choosedByHuman == 'ciseaux' && choosedOneByComp == 'feuille') {
            humanWinCount += 1;
            winEgalOrLoose = 'Victoire!';
            if (soundOnOrOff == 1) {
                setTimeout(() => {
                    victorySound.play();
                }, 800);}
            winCount.innerHTML = `Nombre de victoire(s) : ${humanWinCount}`;
        }
        // resolution du bug d'affichage des stats lorsque humanWinCount = 1 et que numbTotalOfGame == 1 avec cette condition
        if (humanWinCount == 1 && numbTotalOfGame == 1) {
            humanWinRatio = 100;
            percentOfWin.innerHTML = `Votre % de victoire : ${humanWinRatio.toPrecision(3)} %`
        } else {
        humanWinRatio = (humanWinCount / numbTotalOfGame) * 100;
        percentOfWin.innerHTML = `Votre % de victoire : ${humanWinRatio.toPrecision(2)} %`; //Raccourci à 4 charactères
        }
        //ajout des 2 choix - (image) (ordinateur-fromRight & humain-fromLeft) - dans la div "insertCompChoose"
        insertCompChoose.innerHTML = `
        <span id="resultText">${winEgalOrLoose}</span>
        <img src="assets/img/${choosedOneByComp}.png" class="fromRight" alt="Hands choosen by computer">
        <img src="assets/img/${choosedByHuman}.png" class="fromLeft" alt="Hands Choosen by human">
        `;
        //Envoi du son sabre lors de la "colision" avec un delay de 300ms
        if (soundOnOrOff == 1) {
        setTimeout(() => {
            saberSound.play();
        }, 300);}
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
closeStatsModal.addEventListener('click', () => {
    statsModal.style.display = "none";
})
startGame.addEventListener('click', () => {
    welcomeModal.style.display = "none";
    destinySound.play();
    pierre.classList.add('fromTop');
    feuille.classList.add('fromTop');
    ciseaux.classList.add('fromTop');
    rule.classList.add('fromScale0');
    sound.classList.add('fromScale0');
    stats.classList.add('fromScale0');
})

// window.addEventListener("DOMContentLoaded", (event) => {

// })