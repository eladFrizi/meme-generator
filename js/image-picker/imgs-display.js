'use strict';

function displayImgs() {
    var imgs = (gSearch.searchImgs) ? gSearch.searchImgs : gImgs;
    (gSearch.isHexDisplay) ? displayImgsByHex(imgs) : displayImgByList(imgs);
}

// ------------------------------------ REFACTOR ------------------------------
function displayImgsByHex(imgs) {
    const IMG_SIZE = 110;
    if(window.innerHeight < 690){
        var imgColCount = (window.innerHeight > 580)? 4:3;
    } else var imgColCount = 5;

    var imgRowCount = Math.floor((document.body.offsetWidth * 90) / 100 / IMG_SIZE);
    var twoRowCount = 0;
    var imgsInPageCount = (imgRowCount * imgColCount) - Math.floor(imgColCount / 2);
    var startIdx = (gSearch.pageNum - 1) * imgsInPageCount;

    if (startIdx > imgs.length - 1) { // if last page is lower than current page
        console.log('LOWER PAGENUM');
        gSearch.pageNum--;
        updatePageBtn(document.querySelector('.img-page-container button:last-child'));
        displayImgsByHex(imgs);
        return;
    }
    var elImageContainer = document.querySelector('.image-container');
    elImageContainer.innerHTML = '';
    
    for (var i = startIdx; i < imgs.length; i++) {
        if (i === imgsInPageCount + startIdx) {
            break;
        }
        var elImg = renderHexImg(imgs[i], elImageContainer);
        twoRowCount++;

        if (twoRowCount === imgRowCount + 1) {
            elImg.style.marginLeft = '65px';
        }
        if (twoRowCount === (imgRowCount * 2) - 1) {
            twoRowCount = 0;
            elImageContainer.appendChild(document.createElement('br'));
        }
    }
    createPagination(imgs, imgsInPageCount);
}

function renderHexImg(img, elImageContainer) {
    var elImg = document.createElement('img');
    elImg.setAttribute('src', img.url);
    elImg.setAttribute('data-id', img.id)
    elImg.setAttribute('onclick', `imgClicked(${img.id}), event`);
    elImageContainer.appendChild(elImg);
    return elImg;
}

// ------------------------------------ REFACTOR(NOT YET WORKING) ------------------------------
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

function displayAllImgs() {
    gSearch.searchImgs = null;
    gSearch.pageNum = 1;
    displayImgs();
}

function changeDisplayStyle(isHexDisplay) {
    if (gSearch.isHexDisplay !== isHexDisplay) {
        gSearch.isHexDisplay = isHexDisplay;
        displayImgs();
    }
}