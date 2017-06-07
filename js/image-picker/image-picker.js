'use strict';

function imgsInitDisplay() {
    displayImgsByHex(gImgs, 1);
    createKeywords(gImgs);
    addEventListener('resize', function () {
        displayImgs();
    });
}







// deprecated
// function getDisplayedImgs() {
//     var displayedImgs = [];

//     var elImageContainer = document.querySelector('.image-container');
//     var elImgs = elImageContainer.querySelectorAll('img');

//     for (var i = 0; i < elImgs.length; i++) {
//         var idx = gImgs.findIndex(function (img) {
//             return img.url === elImgs[i].getAttribute('src');
//         });
//         displayedImgs.push(gImgs[idx]);
//     }

//     return displayedImgs;
// }

/*
MATCH SCORES:
for every single match:
first word match = searchTxtArr.length
last word match = 1

NOTE:it is possible that an img will appear twice and get more score)
 */