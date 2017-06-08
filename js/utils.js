'use strict';

function saveToStorage(key, any) {
    try {
        localStorage.setItem(key, JSON.stringify(any));
    } catch (err) {
        console.error('Problem saving to storage', err);
    }
}

function loadFromStorage(key) {
    var any = null;
    try {
        any = JSON.parse(localStorage.getItem(key));
    } catch (err) {
        console.warn('Removing Corrupted data from storage', err);
        localStorage.removeItem(key);
    }
    return any;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomAnimationClass() {
    var rnd = Math.floor(Math.random() * 4);
    switch (rnd) {
        case 3:
            return 'bounceInDown';
        case 2:
            return 'bounceInLeft';
        case 1:
            return 'bounceInRight';
        case 0:
            return 'bounceInUp';
    }
}