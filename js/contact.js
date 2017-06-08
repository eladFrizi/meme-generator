'use strict';

function checkContactMsg(){
    // if(loadFromStorage('msg')){
    //     var elH1 = document.createElement('h1');
    //     elH1.innerText ='Thanks for submitting a message!';
    //     var elForm = document.querySelector('.contact form');
    //     elForm.parentNode.replaceChild(elForm,elH1);
    // }
}
function saveMsgToLocalStorage(elBtn){
    var elForm = elBtn.parentNode;
    var msg = {
        name:elForm.querySelector('.contact-name').value,
        email:elForm.querySelector('.contact-email').value,
        subject:elForm.querySelector('.contact-subject').value,
        msg:elForm.querySelector('textarea').value};
        saveToStorage('msg',msg);
}