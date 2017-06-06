'use strict';

var gImgs = [{ id: 1, url: "assets/meme/batman.png" },
{ id: 2, url: "assets/meme/cat.png" },
{ id: 3, url: "assets/meme/di-caprio.png" },
{ id: 4, url: "assets/meme/dog.png" },
{ id: 5, url: "assets/meme/facepalm.png" },
{ id: 6, url: "assets/meme/history.png" },
{ id: 7, url: "assets/meme/lord-of-the-rings.png" },
{ id: 8, url: "assets/meme/nerd.png" },
{ id: 9, url: "assets/meme/skeleton.png" },
{ id: 10, url: "assets/meme/toy-story.png" }];

//onload function
function initApp() {
    displayImgs(gImgs);
}

function displayImgs(imgs) {
    var elImageContainer = document.querySelector('.image-container');
    var imgCountOfLine = Math.floor((document.body.offsetWidth*90)/100 / 110);
    var count = 0;
    for (var i = 0; i < imgs.length; i++) {
        if (count === (imgCountOfLine * 2) - 1) {
            count = 0;
            elImageContainer.appendChild(document.createElement('br'));
        }
        var elImg = document.createElement('img');
        elImg.setAttribute('src', imgs[i].url);
        elImageContainer.appendChild(elImg);
        count++;
    }
}