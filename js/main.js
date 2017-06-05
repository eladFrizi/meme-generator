'use strict';

var gCurrCardStr = 'home';

function toggleNavbar() {
    var elNavbar = document.querySelector('.navbar');
    elNavbar.classList.toggle('offcanvas');
}

function getCardByClass(className) {
    return document.querySelector('.' + className);
}

function showCard(cardStr, navBtn) {
    if (cardStr === gCurrCardStr) return;
    var oldCard = getCardByClass(gCurrCardStr);
    var newCard = getCardByClass(cardStr);

    fadeOut(oldCard);
    document.querySelector('.current').classList.remove('current');
    setTimeout(function () {
        fadeIn(newCard);
        navBtn.classList.add('current');
    }, 250);

    gCurrCardStr = cardStr;
}

function fadeOut(el) {
    var op = 1;
    var sc = 1;
    el.style.opacity = op;
    console.log('op ' + op);
    var timer = setInterval(function () {
        if (op <= 0) {
            el.style.display = 'none';
            el.style.transform = 'translate(-50%,-50%) scale(1)';
            clearInterval(timer);
        }
        el.style.opacity = op;
        el.style.transform = 'translate(-50%,-50%) scale(' + sc + ')';
        op -= 0.1;
        sc -= 0.03;
    }, 25);
    console.log(el.style.opacity);
}

function fadeIn(el) {
    var op = 0;
    var sc = 0.7;
    el.style.opacity = op;
    el.style.display = 'inline-block';
    var timer = setInterval(function () {
        if (op >= 1.0) {
            clearInterval(timer);
            el.style.transform = 'translate(-50%,-50%) scale(1)';
        }
        el.style.opacity = op;
        el.style.transform = 'translate(-50%,-50%) scale(' + sc + ')';
        sc += 0.03;
        op += 0.1;
    }, 25);
}