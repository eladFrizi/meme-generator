'use strict';

function imgsInitDisplay() {
    showCard('image-picker');
    displayImgsByHex(gImgs);
    createKeywords(gImgs);
    addEventListener('resize', function () {
        displayImgs();
    });
}








/*
MATCH SCORES:
SEARCH_KEYWORD_LENGTH/IMAGE_KEYWORD_LENGTH)*SEARCH_KEYWORD_POSITION(first is num of keywords, last is 1)

NOTE:it is possible that an img will appear twice and get more score)
 */