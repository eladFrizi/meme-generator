'use strict';

function displayImgs() {
    var imgs = (gSearch.searchImgs) ? gSearch.searchImgs : gImgs;
    (gSearch.isHexDisplay) ? displayImgsByHex(imgs) : displayImgsByList(imgs);
    new Audio('../assets/image-picker/keyboard-tap.mp3').play();
}

// ------------------------------------ REFACTOR ------------------------------
function displayImgsByHex(imgs) {
    const IMG_SIZE = 110;
    var imgColCount = (window.innerHeight > 580) ? (window.innerHeight > 690) ? 5 : 4 : 3;
    var imgRowCount = Math.floor(document.body.offsetWidth / IMG_SIZE);
    var twoRowCount = 0;
    var imgsInPageCount = (imgRowCount * imgColCount) - Math.floor(imgColCount / 2);
    var startIdx = (gSearch.pageNum - 1) * imgsInPageCount;

    checkPageValidity(startIdx, imgs); // check if startIdx>imgs.length and fix

    var elImageContainer = document.querySelector('.image-container');
    elImageContainer.style.marginLeft = (document.body.offsetWidth % IMG_SIZE / 2) - 10 + 'px';
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
    var animation = getRandomAnimationClass();
    var elImg = document.createElement('img');
    elImg.setAttribute('src', img.url);
    elImg.setAttribute('data-id', img.id);
    elImg.setAttribute('onclick', `imgClicked(${img.id}), event`);
    elImg.classList.add('animated', animation);
    elImageContainer.appendChild(elImg);
    elImg.addEventListener('animationend', function () {
        elImg.classList.remove('animated', animation);
    });
    return elImg;
}

function checkPageValidity(startIdx, imgs) {
    if (startIdx > imgs.length - 1) { // if last page is lower than current page
        gSearch.pageNum--;
        updatePageBtn(document.querySelector('.img-page-container button:last-child'));
        displayImgsByHex(imgs);
        return;
    }
}

// ------------------------------------ REFACTOR(NOT YET WORKING) ------------------------------
function displayImgsByList(imgs) {
    var elImageContainer = document.querySelector('.image-container');
    elImageContainer.innerHTML = '';

    var elList = document.createElement('div');
    elImageContainer.appendChild(elList);

    for (var i = 0; i < imgs.length; i++) {
        // elList.innerHTML += `<li><span>${imgs[i].id}</span> <span>${imgs[i].keywords}</span><img src="${imgs[i].url}" /></li>`;
        elList.innerHTML = '<h1>Sorry!</h1> Not Yet Supported...';
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