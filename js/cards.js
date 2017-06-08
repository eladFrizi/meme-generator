'use strict';

function getCardByClass(className) {
    return document.querySelector('.' + className);
}

function showCard(cardStr) {
    if (cardStr === gCurrCardStr) return;
    var oldCard = getCardByClass(gCurrCardStr);
    var newCard = getCardByClass(cardStr);

    animateNewCard(newCard);
    animateOldCard(oldCard);
    gCurrCardStr = cardStr;

    var audio = new Audio('../assets/showCard-grunt.mp3');
        audio.play();

}
function animateNewCard(newCard) {
    newCard.classList.add('animated', 'zoomInRight');
    newCard.classList.remove('hidden');
    newCard.addEventListener('animationend', function asd() {
        newCard.classList.remove('animated', 'zoomInRight');
    });
}
function animateOldCard(oldCard) {
    oldCard.classList.add('animated', 'fadeOut');
    oldCard.addEventListener('animationend', function asd() {
        oldCard.classList.remove('animated', 'fadeOut');
        oldCard.classList.add('hidden');
    });
}