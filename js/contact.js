'use strict';

function checkContactMsg() {

    if (loadFromStorage('msg')) {

        var elForm = document.querySelector('.contact form');
        var elContact = elForm.parentNode;

        elContact.removeChild(elForm);

        var elH1 = document.createElement('h1');
        elH1.innerText = 'Thanks for submitting a message!';
        elContact.appendChild(elH1);
    }
}
function saveMsgToLocalStorage(elBtn) {
    var elForm = elBtn.parentNode;
    var msg = {
        name: elForm.querySelector('.contact-name').value,
        email: elForm.querySelector('.contact-email').value,
        subject: elForm.querySelector('.contact-subject').value,
        msg: elForm.querySelector('textarea').value
    };
    saveToStorage('msg', msg);
    checkContactMsg();
}