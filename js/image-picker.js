'use strict';

function displayImgs(imgs,imgWidth) {
    var elImageContainer = document.querySelector('.image-container');
    elImageContainer.innerHTML = '';
    var imgCountOfLine = Math.floor((document.body.offsetWidth*90)/100 / imgWidth);
    var count = 0;
    var isEndingWithSmallLine = false;
    for (var i = 0; i < imgs.length; i++) {
        if (count === (imgCountOfLine * 2) - 1) {
            count = 0;
            elImageContainer.appendChild(document.createElement('br'));
        }
        var elImg = document.createElement('img');
        elImg.setAttribute('src', imgs[i].url);
        elImg.setAttribute('data-id', imgs[i].id)
        elImg.setAttribute('onclick',`imgClicked(${imgs[i].id}), event`);
        elImageContainer.appendChild(elImg);
        if(count === imgCountOfLine) elImg.style.marginLeft = '65px'; 
        count++;
    }
}