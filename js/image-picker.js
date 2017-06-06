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
    if (event.keyCode === 13) searchInput.nextSibling.click();
}
function searchImgs(btn) {
    var searchResults = [];

    var searchTxtArr = btn.previousSibling.value.toLowerCase().split(' ');
    btn.previousSibling.value = '';

    for (var i = 0; i < gImgs.length; i++) { // iterating imgs
        var img = gImgs[i];
        for (var j = 0; j < searchTxtArr.length; j++) { // iterating txt keywords
            var currKeyword = searchTxtArr[j];
            for (var k = 0; k < img.keywords.length; k++) { // iterating img keywords
                var imgKeyword = img.keywords[k];
                if (currKeyword === imgKeyword) {
                    searchResults = updateSearchResults(searchResults, i, searchTxtArr.length-j);
                }
            }
        }
    }
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
        searchResults.push(gImgs.slice(imgIdx, imgIdx+1)[0]); // slicing img into search results
        searchResults[searchResults.length - 1].matchScore = score;
    }
    return searchResults;
}


/*
MATCH SCORES:
for every single match:
first word match = searchTxtArr.length
last word match = 1

NOTE:it is possible that an img will appear twice and get more score)
 */