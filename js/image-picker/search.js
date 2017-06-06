'use strict';

function searchIfEnter(event, searchInput) {
    if (event.keyCode === 13) searchInput.parentNode.querySelector('.search-btn').click();
}

function searchImgs() {
    var searchResults = [];
    var elInput = document.querySelector('.search-imgs-input');
    var searchTxtArr = elInput.value.toLowerCase().split(' ');
    elInput.value = '';

    for (var i = 0; i < gImgs.length; i++) { // iterating imgs
        var img = gImgs[i];
        for (var j = 0; j < searchTxtArr.length; j++) { // iterating all txt keywords for every img
            var currKeyword = searchTxtArr[j];
            for (var k = 0; k < img.keywords.length; k++) { // iterating all img keywords for every txt keyword 
                var imgKeyword = img.keywords[k];
                if (currKeyword === imgKeyword) {
                    searchResults = updateSearchResults(searchResults, i, searchTxtArr.length - j);
                }
            }
        }
    }
    searchResults = searchResults.sort(function (a, b) {
        return b.matchScore - a.matchScore;
    });
    displayImgsByHex(searchResults, 110);
}

function updateSearchResults(searchResults, imgIdx, score) {
    for (var k = 0; k < searchResults.length; k++) { // iterating search results
        if (searchResults[k].id === gImgs[imgIdx].id) { // if img is found in matching imgs
            searchResults[k].matchScore += score;
            break;
        }
    }
    if (k === searchResults.length) { // if img is not found in matching imgs
        var newImg = Object.assign({}, gImgs[imgIdx])
        searchResults.push(newImg); // slicing img into search results
        searchResults[searchResults.length - 1].matchScore = score;
    }
    return searchResults;
}

function createKeywords(gImgs) {
    var allKeywords = [];
    for (var i = 0; i < gImgs.length; i++) { // iterating imgs
        var img = gImgs[i];

        for (var j = 0; j < img.keywords.length; j++) { // for every img, iterate keywords
            var idx = allKeywords.findIndex(function (keyword) {
                return img.keywords[j] === keyword.txt;
            });
            if (idx !== -1) allKeywords[idx].fontSize += 5;
            else {
                allKeywords.push({ txt: img.keywords[j] });
                allKeywords[allKeywords.length - 1].fontSize = 20;
            }

        }
    }
    displayKeywords(allKeywords);
}

function displayKeywords(keywords) {
    var elImgKeywordContainer = document.querySelector('.img-keywords-container');
    for (var i = 0; i < keywords.length; i++) {
        var elKeyword = document.createElement('span');
        elKeyword.setAttribute('onclick', 'searchByKeyword(this.innerText)');
        elKeyword.innerText = keywords[i].txt;
        elKeyword.style.fontSize = keywords[i].fontSize + 'px';
        elImgKeywordContainer.appendChild(elKeyword);
    }
}

function searchByKeyword(keyword) {
    var searchResults = [];

    for (var i = 0; i < gImgs.length; i++) {
        if (gImgs[i].keywords.includes(keyword)) searchResults.push(gImgs[i]);
    }

    displayImgsByHex(searchResults);
}