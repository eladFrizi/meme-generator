'use strict';

function searchIfClickedEnter(event, searchInput) {
    if (event.keyCode === 13) searchInput.parentNode.querySelector('.search-btn').click();
}

// ------------------------------------ REFACTOR ------------------------------
function searchImgs() {
    var searchResults = [];
    var elInput = document.querySelector('.search-imgs-input');
    var searchTxtArr = elInput.value.toLowerCase().split(' ');
    elInput.value = '';

    for (var i = 0; i < gImgs.length; i++) { // iterating imgs
        var img = gImgs[i];
        for (var j = 0; j < searchTxtArr.length; j++) { // iterating all txt keywords(for every img)
            var currKeyword = searchTxtArr[j];
            for (var k = 0; k < img.keywords.length; k++) { // iterating all img keywords(for every txt keyword) 
                var imgKeyword = img.keywords[k];
                if (imgKeyword.includes(currKeyword)) {
                    searchResults = updateSearchResults(searchResults, i, currKeyword.length/imgKeyword.length*(searchTxtArr.length - j));
                }
            }
        }
    }
    searchResults = searchResults.sort(function (a, b) {
        return b.matchScore - a.matchScore;
    });
    if (searchResults[0]) { // if at least one result found
        gSearch.searchImgs = searchResults;
        displayImgs();
    } else {
        document.querySelector('.image-container').innerHTML = '<h1>Sorry!</h1> there are no matching results.';
    }
}

function updateSearchResults(searchResults, imgIdx, score) {
    for (var k = 0; k < searchResults.length; k++) { // iterating search results
        if (searchResults[k].id === gImgs[imgIdx].id) { // if img is found in matching imgs
            searchResults[k].matchScore += score;
            break;
        }
    }
    if (k === searchResults.length) { // if img is not found in matching imgs
        var newImg = Object.assign({}, gImgs[imgIdx]);
        searchResults.push(newImg); // copying as new img onto search results
        searchResults[searchResults.length - 1].matchScore = score;
    }
    return searchResults;
}

function createKeywords(gImgs) {
    const BASE_FONTSIZE = 15;
    const BASE_FONTWEIGHT = 400;
    const ADD_FONTSIZE = 5;
    const ADD_FONTWEIGHT = 100;
    var allKeywords = [];

    for (var i = 0; i < gImgs.length; i++) { // iterating imgs
        var img = gImgs[i];

        for (var j = 0; j < img.keywords.length; j++) { // for every img, iterate keywords
            var idx = allKeywords.findIndex(function (keyword) {
                return img.keywords[j] === keyword.txt;
            });

            if (idx !== -1) { // if found, update keyword
                allKeywords[idx].fontSize += ADD_FONTSIZE;
                allKeywords[idx].fontWeight += ADD_FONTWEIGHT;
            } else { // else,create new keyword in arr
                allKeywords.push({ txt: img.keywords[j] });
                allKeywords[allKeywords.length - 1].fontSize = BASE_FONTSIZE;
                allKeywords[allKeywords.length - 1].fontWeight = BASE_FONTWEIGHT;
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
        elKeyword.style.fontWeight = keywords[i].fontWeight;
        elImgKeywordContainer.appendChild(elKeyword);
    }
}

function searchByKeyword(keyword) {
    var searchResults = [];

    for (var i = 0; i < gImgs.length; i++) {
        if (gImgs[i].keywords.includes(keyword)) searchResults.push(gImgs[i]);
    }
    gSearch.searchImgs = searchResults;
    displayImgs();
}