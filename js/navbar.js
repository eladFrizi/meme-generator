'use strict';

function handleClick(selector) {
    event.preventDefault();
    smoothScroll(document.querySelector(selector));
};

function goCardBack() {
    switch (gCurrCardStr) {
        case 'home':
            return;
        case 'image-picker':
            showCard('home');
            break;
        case 'meme-generator':
            showCard('image-picker');
            break;
    }
}