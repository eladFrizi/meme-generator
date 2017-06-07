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

function CreatePopup(HTMLContent, parent) {

    // creating the popup element
    var elPopup = document.createElement('div');
    elPopup.classList.add('popup');
    elPopup.style.position = 'absolute';

    // if no parent was assigned,put it mid-screen
    if (!parent) {
        parent = document.body;
        elPopup.classList.add('mid-screen-popup');
    }
    parent.appendChild(elPopup);

    // inserting content
    elPopup.innerHTML = HTMLContent; // VULNERABLE!

    // sets the onblur to close the popup
    elPopup.setAttribute('tabindex', '1');
    elPopup.setAttribute('onblur', 'this.parentNode.removeChild(this);');
    elPopup.focus();
    elPopup.style.outline = '0px'; // prevents default outline action of focus
}

function editEl(oldElement,modelVar,elType) {
    if(!elType) elType = 'span';
    // creating the input element
    var elInput = document.createElement('input');
    elInput.setAttribute('type', 'text');
    elInput.setAttribute('onblur', 'applyEditEl(this,' + modelVar + ','+elType+')');
    elInput.setAttribute('value', oldElement.innerText);
    oldElement.parentNode.appendChild(elInput);

    // removing the old text element
    oldElement.parentNode.removeChild(oldElement);
    elInput.focus();
}

function applyEditEl(elInput,modelVar,elType) {
    if(!elType) elType = 'span';
    // creating the new span element
    var elSpan = document.createElement('span');
    elSpan.setAttribute('onclick', 'editEl(this,' + modelVar + ','+elType+')');

    // updating model(if needed) and DOM
    if(modelVar) modelVar = elInput.value;
    elSpan.innerText = elInput.value;

    // appending new text child, removing old input child
    elInput.parentNode.appendChild(elSpan);
    elInput.parentNode.removeChild(elInput)
}