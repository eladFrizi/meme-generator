'use strict';

function getCardByClass(className) {
    return document.querySelector('.' + className);
}

function showCard(cardStr) {
    if (cardStr === gCurrCardStr) return;
    var oldCard = getCardByClass(gCurrCardStr);
    var newCard = getCardByClass(cardStr);

    animateOldCard(oldCard);
    setTimeout(function () {
        switch (cardStr) {
            case 'image-picker':
                animateImgPicker(newCard);
                break;
            case 'meme-generator':
                animateMemeGen();
                break;
            default:
                break;
        }
    }, 1500);
    gCurrCardStr = cardStr;
    var audio = new Audio('../assets/showCard-grunt.mp3');
    audio.play();

}
function animateImgPicker(elImgPicker) {
    elImgPicker.classList.remove('hidden');
    elImgPicker.childNodes.forEach(function (element) {
        if (element.nodeType === 3) return;
        var animation = getRandomAnimationClass();
        element.classList.add('animated', animation);
        element.addEventListener('animationend', function () {
            element.classList.remove('animated', animation);
        })
    });
    setTimeout(function () {
        displayImgs();
    }, 700);
    createKeywords(gImgs);
    addEventListener('resize', function () {
        displayImgs();
        setTimeout(function () {
            document.body.style.color = 'inherit';
        }, 0);
    });
}
function animateOldCard(oldCard) {
    oldCard.classList.add('animated', 'fadeOut');
    setTimeout(function () {
        oldCard.classList.remove('animated', 'fadeOut');
        oldCard.classList.add('hidden');
    }, 1000);
}




// deprecated
// function animateNewCard(newCard) {
//     // newCard.classList.add('animated', 'zoomInRight');
//     newCard.classList.remove('hidden');
//     newCard.addEventListener('animationend', function asd() {
//         newCard.classList.remove('animated', 'zoomInRight');
//     });
// }