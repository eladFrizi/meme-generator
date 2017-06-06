'use strict';

function displayImgs(imgs, imgWidth) {
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
        elImg.setAttribute('onclick',`imgClicked(${imgs[i].id}), event`);
        elImageContainer.appendChild(elImg);
        if (count === imgCountOfLine) elImg.style.marginLeft = '65px';
        count++;
    }
}

function searchIfEnter(event, searchInput) {
    if (event.keyCode === 13) searchInput.parentNode.querySelector('.search-btn').click();
}

function searchImgs(btn) {
    var searchResults = [];

    var searchTxtArr = btn.parentNode.querySelector('input[type="search"]').value.toLowerCase().split(' ');
    btn.previousSibling.value = '';

    for (var i = 0; i < gImgs.length; i++) { // iterating imgs
        var img = gImgs[i];
        for (var j = 0; j < searchTxtArr.length; j++) { // iterating all txt keywords for every img
            var currKeyword = searchTxtArr[j];
            for (var k = 0; k < img.keywords.length; k++) { // iterating all img keywords for every txt keyword 
                var imgKeyword = img.keywords[k];
                if (currKeyword === imgKeyword) {
                    searchResults = updateSearchResults(searchResults, i, searchTxtArr.length-j);
                }
            }
        }
    }
    searchResults = searchResults.sort(function(a,b){
        return b.matchScore - a.matchScore;
    });
    displayImgs(searchResults,110);
}

function updateSearchResults(searchResults, imgIdx, score) {
    for (var k = 0; k < searchResults.length; k++) { // iterating search results
        if (searchResults[k].id === gImgs[imgIdx].id) { // if img is found in matching imgs
            searchResults[k].matchScore += score;
            break;
        }
    }
    if (k === searchResults.length) { // if img is not found in matching imgs
        var newImg = Object.assign({},gImgs[imgIdx])
        searchResults.push(newImg); // slicing img into search results
        searchResults[searchResults.length - 1].matchScore = score;
    }
    return searchResults;
}

function createKeywords(gImgs){
    var allKeywords =[];
    for (var i = 0; i < gImgs.length; i++) { // iterating imgs
        var img = gImgs[i];

        for (var j = 0; j < img.keywords.length; j++) { // for every img, iterate keywords
            var idx = allKeywords.findIndex(function(keyword){
                return img.keywords[j] === keyword.txt;
            });
            if(idx !== -1) allKeywords[idx].fontSize += 5;
            else {
                allKeywords.push({txt:img.keywords[j]});
                allKeywords[allKeywords.length-1].fontSize = 20;
            }

        }
    }
    displayKeywords(allKeywords);
}

function displayKeywords(keywords){
    var elImgKeywordContainer= document.querySelector('.img-keywords-container');
    for (var i = 0; i < keywords.length; i++) {
        var elKeyword = document.createElement('span');
        elKeyword.setAttribute('onclick','searchByKeyword(this.innerText)');
        elKeyword.innerText = keywords[i].txt;
        elKeyword.style.fontSize = keywords[i].fontSize+'px';
        elImgKeywordContainer.appendChild(elKeyword);
    }
}

function searchByKeyword(keyword){
    var searchResults = [];

    for (var i = 0; i < gImgs.length; i++) {
        if(gImgs[i].keywords.includes(keyword)) searchResults.push(gImgs[i]);
    }

    displayImgs(searchResults);
}

/*
MATCH SCORES:
for every single match:
first word match = searchTxtArr.length
last word match = 1

NOTE:it is possible that an img will appear twice and get more score)
 */