'use strict';

function imgsInitDisplay() {
    displayImgsByHex(gImgs, 110);
    createKeywords(gImgs);
    addEventListener('resize',function(){
        displayImgs();
    });
}
function displayImgs(imgs) {
    if(!imgs) imgs = getDisplayedImgs();
    if (gState.isHexDisplay) displayImgsByHex(imgs, 110);
    else displayImgByList(imgs);
}
function displayImgsByHex(imgs, imgWidth) {
    var elImageContainer = document.querySelector('.image-container');
    elImageContainer.innerHTML = '';
    var imgCountOfLine = Math.floor((document.body.offsetWidth * 90) / 100 / imgWidth);
    var count = 0;
    for (var i = 0; i < imgs.length; i++) {
        if (count === (imgCountOfLine * 2) - 1) {
            count = 0;
            elImageContainer.appendChild(document.createElement('br'));
        }
        var elImg = document.createElement('img');
        elImg.setAttribute('src', imgs[i].url);
        elImg.setAttribute('data-id', imgs[i].id)
        elImg.setAttribute('onclick', `imgClicked(${imgs[i].id}), event`);
        elImageContainer.appendChild(elImg);
        if (count === imgCountOfLine) elImg.style.marginLeft = '65px';
        count++;
    }
}

function displayImgsByList(imgs) {
    var elImageContainer = document.querySelector('.image-container');
    elImageContainer.innerHTML = '';

    var elTable = document.createElement('table');
    elImageContainer.appendChild(elTable);
    elTable.innerHTML += '<thead><tr><th>ID</th><th>Keywords</th><th>Image</th></tr></thead>';

    for (var i = 0; i < imgs.length; i++) {
        elTable.innerHTML += '<tr><td>' + imgs[i].id + '</td><td>' + imgs[i].keywords + '</td><td><img src="' + imgs[i].url + '" /></td></tr>';
    }
}

function getDisplayedImgs() {
    var displayedImgs = [];

    var elImageContainer = document.querySelector('.image-container');
    var elImgs = elImageContainer.querySelectorAll('img');

    for (var i = 0; i < elImgs.length; i++) {
        var idx = gImgs.findIndex(function (img) {
            return img.url === elImgs[i].getAttribute('src');
        });
        displayedImgs.push(gImgs[idx]);
    }

    return displayedImgs;
}

/*
MATCH SCORES:
for every single match:
first word match = searchTxtArr.length
last word match = 1

NOTE:it is possible that an img will appear twice and get more score)
 */