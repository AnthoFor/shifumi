let humanWinCount = 0;
let humanLooseCount = 0;
let numbTotalOfGame = 0;
let shifuArray = ['pierre', 'feuille', 'ciseaux'];
let humanWinRatio = 0;
let winEgalOrLoose = '';
let soundOnOrOff = 1;
playerBarGreen.style.width = '100%';
computerBarRed.style.width = '0%';
// UN CODE BIEN INDENTé = UN THIERRY-PAS-ENERVé
// UN CODE BIEN COMMENTé = UN THIERRY RELAXé :)

// calcul de la hauteur du playzone, et ajustement de la hauteur des barres.
fromXPlayZone = document.getElementById('insertCompChoose').getBoundingClientRect().top;
lifeBar.style.top = fromXPlayZone + 4 +'px';
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
            winEgalOrLoose = 'Perdu';
            setTimeout(() => {
                removeLifeFromPlayer();
            },800);
            if (soundOnOrOff == 1) {
                setTimeout(() => {
                    looseSound.play();
                }, 800);}
            looseCount.innerHTML = `Nombre de defaite(s) : ${humanLooseCount}`;
        } else if (choosedByHuman == 'pierre' && choosedOneByComp == 'ciseaux') {
            humanWinCount += 1;
            winEgalOrLoose = 'Victoire!';
            setTimeout(() => {
                removeLifeFromComputer();
            },800);
            if (soundOnOrOff == 1) {
                setTimeout(() => {
                    victorySound.play();
                }, 800);}
            winCount.innerHTML = `Nombre de victoire(s) : ${humanWinCount}`;
        } else if (choosedByHuman == 'feuille' && choosedOneByComp == 'pierre') {
            humanWinCount += 1;
            winEgalOrLoose = 'Victoire!';
            setTimeout(() => {
                removeLifeFromComputer();
            },800);
            if (soundOnOrOff == 1) {
                setTimeout(() => {
                    victorySound.play();
                }, 800);}
            winCount.innerHTML = `Nombre de victoire(s) : ${humanWinCount}`;
        } else if (choosedByHuman == 'feuille' && choosedOneByComp == 'ciseaux') {
            humanLooseCount += 1;
            winEgalOrLoose = 'Perdu';
            setTimeout(() => {
                removeLifeFromPlayer();
            },800);
            if (soundOnOrOff == 1) {
                setTimeout(() => {
                    looseSound.play();
                }, 800);}
            looseCount.innerHTML = `Nombre de defaite(s) : ${humanLooseCount}`;
        } else if (choosedByHuman == 'ciseaux' && choosedOneByComp == 'pierre') {
            humanLooseCount += 1;
            winEgalOrLoose = 'Perdu';
            setTimeout(() => {
                removeLifeFromPlayer();
            },800);
            if (soundOnOrOff == 1) {
                setTimeout(() => {
                    looseSound.play();
                }, 800);}
            looseCount.innerHTML = `Nombre de defaite(s) : ${humanLooseCount}`;
        } else if (choosedByHuman == 'ciseaux' && choosedOneByComp == 'feuille') {
            humanWinCount += 1;
            winEgalOrLoose = 'Victoire!';
            setTimeout(() => {
                removeLifeFromComputer();
            },800);
            if (soundOnOrOff == 1) {
                setTimeout(() => {
                    victorySound.play();
                }, 800);}
            winCount.innerHTML = `Nombre de victoire(s) : ${humanWinCount}`;
        }
        // resolution du bug d'affichage des stats lorsque humanWinCount = 1 et que numbTotalOfGame == 1 avec cette condition
        if (humanWinCount == numbTotalOfGame) {
            humanWinRatio = 100;
            percentOfWin.innerHTML = `Votre % de victoire : ${humanWinRatio.toPrecision(3)} %`
        } else {
        humanWinRatio = (humanWinCount / numbTotalOfGame) * 100;
        percentOfWin.innerHTML = `Votre % de victoire : ${humanWinRatio.toPrecision(2)} %`; //Raccourci à 4 charactères
        }
        //ajout des 2 choix - (image) (ordinateur-fromRight & humain-fromLeft) - dans la div "insertCompChoose"
        insertCompChoose2.innerHTML = `
        <span id="resultText">${winEgalOrLoose}</span>
        <img src="assets/img/${choosedByHuman}.png" class="humanChoose" alt="Hands Choosen by human">
        <img src="assets/img/${choosedOneByComp}.png" class="fromRight" alt="Hands choosen by computer">
        `;
        //Envoi du son sabre lors de la "colision" avec un delay de 300ms
        if (soundOnOrOff == 1) {
            setTimeout(() => {
                saberSound.play();
            }, 300);}
        // Check du niveau de vie du joueur ou de l'ordinateur
        setTimeout(() => {
            if (playerBarGreen.style.width == '0%') {
                finalModal.style.display = 'block';
                insertContentFinalModal.innerHTML = `<span class="fontSpe">Vous avez perdu, vous aurez peut être plus de 
                chance la prochaine fois! </span>`;
                
            }
            if (computerBarRed.style.width == '100%') {
                finalModal.style.display = 'block';
                insertContentFinalModal.innerHTML = `<span class="fontSpe">Félicitations! Vous avez battu l'ordinateur!</span>`;
            }
        }, 1500)  
        
        
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
    let choosedUserName = userNameInput.value
    if (choosedUserName != '') {
        welcomeModal.style.display = "none";
        destinySound.play();
        pierre.classList.add('fromTop');
        feuille.classList.add('fromTop');
        ciseaux.classList.add('fromTop');
        rule.classList.add('fromScale0');
        sound.classList.add('fromScale0');
        stats.classList.add('fromScale0');
        textSpan.classList.add('fromScale0');
        lifeBar.classList.add('fromScale0');
        insertUserNameHere.innerHTML = `${choosedUserName}`;
    } else {
        alert('merci de renseigner un pseudo... ;)')
    }  
})
resetStats.addEventListener('click', () => {
    humanWinCount = 0;
    humanLooseCount = 0;
    numbTotalOfGame = 0;
    humanWinRatio = 0;
    winCount.innerHTML = `Nombre de victoire(s) : ${humanWinCount}`;
    looseCount.innerHTML = `Nombre de defaite(s) : ${humanLooseCount}`;
    nbTotalGame.innerHTML = `Nombre total de partie(s) : ${numbTotalOfGame}`;
    percentOfWin.innerHTML = `Votre % de victoire : ${humanWinRatio.toPrecision(3)} %`
})
//quand je close la final modal, alors remet les barres a 0
closeFinalModal.addEventListener('click', () => {
    finalModal.style.display = 'none';
    resetBar();
})
// window.addEventListener("DOMContentLoaded", (event) => {

// })

removeLifeFromPlayer = () => {
    if (playerBarGreen.style.width == '100%') {
        playerBarGreen.style.width = '90%';
    } else if (playerBarGreen.style.width == '90%') {
        playerBarGreen.style.width = '80%';
    } else if (playerBarGreen.style.width == '80%') {
        playerBarGreen.style.width = '70%';
    } else if (playerBarGreen.style.width == '70%') {
        playerBarGreen.style.width = '60%';
    } else if (playerBarGreen.style.width == '60%') {
        playerBarGreen.style.width = '50%';
    } else if (playerBarGreen.style.width == '50%') {
        playerBarGreen.style.width = '40%';
    } else if (playerBarGreen.style.width == '40%') {
        playerBarGreen.style.width = '30%';
    } else if (playerBarGreen.style.width == '30%') {
        playerBarGreen.style.width = '20%';
    } else if (playerBarGreen.style.width == '20%') {
        playerBarGreen.style.width = '10%';
    } else if (playerBarGreen.style.width == '10%') {
        playerBarGreen.style.width = '0%';
    }
}
removeLifeFromComputer = () => {
    if (computerBarRed.style.width == '0%') {
        computerBarRed.style.width = '10%';
    } else if (computerBarRed.style.width == '10%') {
        computerBarRed.style.width = '20%';
    } else if (computerBarRed.style.width == '20%') {
        computerBarRed.style.width = '30%';
    } else if (computerBarRed.style.width == '30%') {
        computerBarRed.style.width = '40%';
    } else if (computerBarRed.style.width == '40%') {
        computerBarRed.style.width = '50%';
    } else if (computerBarRed.style.width == '50%') {
        computerBarRed.style.width = '60%';
    } else if (computerBarRed.style.width == '60%') {
        computerBarRed.style.width = '70%';
    } else if (computerBarRed.style.width == '70%') {
        computerBarRed.style.width = '80%';
    } else if (computerBarRed.style.width == '80%') {
        computerBarRed.style.width = '90%';
    } else if (computerBarRed.style.width == '90%') {
        computerBarRed.style.width = '100%';
    }
}

resetBar = () => {
    computerBarRed.style.width = '0%';
    playerBarGreen.style.width = '100%';
    finalModal.style.display = 'none';
}