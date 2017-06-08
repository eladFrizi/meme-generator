
var diffrenceBetweenTextAndCanvas = 50;


var gCanvasState = {
}



function imgClicked(id, event) {
    var imgObj = findImageObJ(id);
    getCanvasState(imgObj)
    createCanvasWithImage(gCanvasState)
    renderTxts(gCanvasState)
    showCard('meme-generator');
    adjustEditor(document.querySelector('.meme-text-picker'))
}

function findImageObJ(id) {
    var imgObj = gImgs.find(function (img) {
        if (img.id === id) return true
    })
    return imgObj
}


function getCanvasState(imgObj) {
    gCanvasState.openInEditor = document.querySelector('.meme-text-picker').value;
    gCanvasState.img = imgObj;
    gCanvasState.text1 = {
        text: 'edit me text1',
        fillStyle: '#c11f1f',
        textAlign: 'center',
        left: 100,
        top: 100,
        size: 30,
        fontFamily: 'Fantasy'
    }
    gCanvasState.text2 = {
        text: 'edit me text2',
        fillStyle: '#eb42f4',
        textAlign: 'left',
        left: 100,
        top: 10,
        size: 30,
        fontFamily: 'Verdana'
    }
}

function adjustEditor(select) {
    gCanvasState.openInEditor = select.value;
    var currentInfoToShow = gCanvasState[gCanvasState.openInEditor];
    var editUnit = document.querySelector('.edit-unit');
    editUnit.querySelector('.font-picker').value = currentInfoToShow.fontFamily;
    editUnit.querySelector('.color-picker').value = currentInfoToShow.fillStyle;
    editUnit.querySelector('.size-picker').value = currentInfoToShow.size;
    editUnit.querySelector(".change-text").value = currentInfoToShow.text;
}

function createCanvasWithImage(canvasState) {
    var elImg = new Image();
    elImg.src = canvasState.img.url;
    var canvasSTR = `<canvas id="myCanvas" width="${elImg.width}" height="${elImg.height}" style="border:1px solid #d3d3d3;">`
    document.querySelector('.canvas-container').innerHTML = canvasSTR;
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.drawImage(elImg, 0, 0);
}


function renderTxts(state) {
    createCanvasWithImage(state)
    for (prop in state) {
        var checker = prop.substring(0, 4)
        if (checker === 'text') {
            var canvasCover = document.querySelector(".canvas-container");
            var textKey = state[prop];
            var divOverCanvas = document.createElement('div');
            divOverCanvas.className = 'drag-el';
            divOverCanvas.id = prop
            divOverCanvas.innerHTML = `<p contenteditable="true">${textKey.text}</p>`;
            divOverCanvas.style.maxWidth = canvasCover.width;
            divOverCanvas.style.position = 'absolute';
            divOverCanvas.style.overflowWrap = 'break-word';
            divOverCanvas.style.top = textKey.top + 'px';
            divOverCanvas.style.left = textKey.left + 'px';
            divOverCanvas.style.fontSize = textKey.size + 'px';
            divOverCanvas.style.fontFamily = textKey.fontFamily;
            divOverCanvas.style.color = textKey.fillStyle;
            divOverCanvas.style.zIndex = 50;
            divOverCanvas.setAttribute('ondragstart', "drag(event)");
            divOverCanvas.setAttribute('draggable', "true");
            divOverCanvas.style.display = 'flex';
            divOverCanvas.style.flexDirection = 'column';
            divOverCanvas.style.alignItems = 'center';
            divOverCanvas.setAttribute('onblur', 'updateModelTxt(this)')
            var movementBtn = `<img src="https://image.flaticon.com/icons/svg/181/181513.svg" class="movement-btn" height="10" width="10">`;
            divOverCanvas.innerHTML += movementBtn;
            canvasCover.appendChild(divOverCanvas)
        }
    }
}

function edit(input, property) {
    var textKey = gCanvasState.openInEditor;
    var value = input.value;
    gCanvasState[textKey][property] = value;
    renderTxts(gCanvasState)
}


function updateModelTxt(changedEl) {
    var textKey = changedEl.id;
    gCanvasState[textKey].text = changedEl.innerText;
}

function moveTextByArrows(direction) {
    var textKey = gCanvasState.openInEditor;
    var textToChange = gCanvasState[textKey]
    var canvas = document.querySelector('canvas')
    switch (direction) {
        case 'up':
            if (textToChange.top < 0) break;
            textToChange.top -= 10;
            break;
        case 'down':
            if (canvas.offsetHeight < textToChange.top + diffrenceBetweenTextAndCanvas) break;
            textToChange.top += 10;
            break;
        case 'left':
            if(textToChange.left < 0) break;
            textToChange.left -= 10;
            break;
        case 'right':
            if(canvas.offsetWidth < textToChange.left - 10) break;
            textToChange.left += 10;
            break;
    }

    renderTxts(gCanvasState);
}


    function allowDrop(event) {
        event.preventDefault();
    }


    function drag(ev) {
        if (ev.target.className === 'movement-btn') {
            var toTransform = ev.target.parentElement.id;
        } else {
            var toTransform = ev.target.id
        }
        ev.dataTransfer.setData("text", toTransform);
        ev.dataTransfer.setDragImage(ev.target, ev.target.offsetWidth / 1.5, ev.target.offsetHigth / 2);
    }

    function drop(ev, fatherEl) {
        var data = ev.dataTransfer.getData("text");
        var draggedElement = document.querySelector('#' + data);
        var newTop = (ev.pageY - fatherEl.offsetTop - diffrenceBetweenTextAndCanvas - 5 );
        var newLeft = (ev.pageX - fatherEl.offsetLeft - draggedElement.offsetWidth);
        if (newTop < -5 || newTop > fatherEl.clientHeight - draggedElement.clientHeight) {
            newTop = fatherEl.clientHeight - draggedElement.clientHeight;
        }
        if (newLeft < 0) newLeft = 0;
        draggedElement.style.top = newTop + 'px';
        draggedElement.style.left = newLeft + 'px';
        gCanvasState[data].top = newTop;
        gCanvasState[data].left = newLeft;
    }




    function addNewText() {
        var textsCounter = 0
        for (prop in gCanvasState) {
            if (prop.substring(0, 4) === 'text') {
                textsCounter++;
            }
        }
        var textKey = 'text' + (textsCounter + 1);
        var newText = {
            text: 'NEW Text',
            fillStyle: '#c11f1f',
            textAlign: 'center',
            left: 0,
            top: 50,
            size: 30,
            fontFamily: 'Fantasy'
        }
        gCanvasState[textKey] = newText;
        renderTxts(gCanvasState);
        var newOpition = document.createElement("option");
        newOpition.setAttribute('value', `${textKey}`);
        newOpition.innerText = `New text -${textKey}`;
        document.querySelector('.meme-text-picker').appendChild(newOpition);
    }

    function printOnCanvas() {
        var c = document.getElementById("myCanvas");
        for (prop in gCanvasState) {
            if (prop.substring(0, 4) === 'text') {

                var left = (c.width / c.offsetWidth) * gCanvasState[prop].left;
                var top = (c.height / c.offsetHeight) * gCanvasState[prop].top + (+gCanvasState[prop].size);
                var ctx = c.getContext("2d");
                ctx.font = `${+gCanvasState[prop].size}px ${gCanvasState[prop].fontFamily}`;
                ctx.fillStyle = `${gCanvasState[prop].fillStyle}`;
                ctx.fillText(`${gCanvasState[prop].text}`, `${left}`, `${top}`);
            }
        }

    }


    function convertCanvasToImage() {
        var image = new Image();
        image.src = document.querySelector('canvas').toDataURL("image/png");
        return image;
    }

    function openModalAndPrintPImage(elImage) {
        var elModal = document.querySelector('.modal-img')
        elModal.appendChild(elImage);
        elModal.style.display = 'block'
    }

    function finishCLicked() {
        printOnCanvas()
        var elImage = convertCanvasToImage();
        openModalAndPrintPImage(elImage)
    }


