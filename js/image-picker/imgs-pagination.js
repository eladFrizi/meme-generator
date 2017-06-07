'use strict';


function createPagination(imgs, imgsInPageCount) {
    var elImgPageContainer = document.querySelector('.image-picker .img-page-container');
    elImgPageContainer.innerHTML = '';
    for (var i = 1; i <= Math.ceil(imgs.length / imgsInPageCount); i++) {
        var elBtn = document.createElement('button');
        elBtn.setAttribute('onclick', `changePage(this)`);
        elBtn.innerText = i;
        elImgPageContainer.appendChild(elBtn);
        if (i === gSearch.pageNum) updatePageBtn(elBtn);
    }
}

function changePage(elBtn) {
    if (elBtn.innerText !== gSearch.pageNum) {
        gSearch.pageNum = +elBtn.innerText;
        updatePageBtn(elBtn);
        displayImgs();
    }
}

function updatePageBtn(elBtn) {
    var elImgPageContainerChilds = document.querySelector('.img-page-container').childNodes;

    for (var i = 0; i < elImgPageContainerChilds.length; i++) { // resetting currPage
        elImgPageContainerChilds[i].classList.remove('curr-page');
    }

    elBtn.classList.add('curr-page');
}
