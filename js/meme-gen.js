
var gCanvasState = {
}



function imgClicked(id, event) {
    var imgObj = findImageObJ(id);
    getCanvasState(imgObj)
    createCanvasWithImage(gCanvasState)
    renderTxts(gCanvasState)
    showCard('meme-generator');
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
        fillStyle: 'red',
        textAlign: 'center',
        left: 100,
        top: 100,
        size: 30,
        fontFamily: 'Fantasy'
    }
    gCanvasState.text2 = {
        text: 'edit me text2',
        fillStyle: 'red',
        textAlign: 'left',
        left: 100,
        top: 10,
        size: 30,
        fontFamily: 'Ariel'
    }
}

function adjustEditor(select){
        gCanvasState.openInEditor = select.value;
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
            divOverCanvas.className ='drag-el';
            divOverCanvas.id = prop
            divOverCanvas.innerHTML = `<p>${textKey.text}</p>`;
            divOverCanvas.style.maxWidth = canvasCover.width;
            divOverCanvas.style.position = 'absolute';
            // divOverCanvas.style.width = '100%';
            divOverCanvas.style.overflowWrap = 'break-word';
            divOverCanvas.style.top = textKey.top + 'px';
            divOverCanvas.style.left = textKey.left + 'px';
            divOverCanvas.style.fontSize = textKey.size + 'px';
            divOverCanvas.style.textAlign = textKey.textAlign;
            divOverCanvas.style.fontFamily = textKey.fontFamily;
            divOverCanvas.style.color = textKey.fillStyle;
            divOverCanvas.style.zIndex = 50;
            divOverCanvas.setAttribute('ondragstart', "drag(event)")
            divOverCanvas.setAttribute('draggable', "true")
            divOverCanvas.setAttribute('contenteditable', 'true')
            divOverCanvas.setAttribute('onblur', 'updateModelTxt(this)')
            canvasCover.appendChild(divOverCanvas)
        }
    }
}

function editText(input) {
    var textKey = gCanvasState.openInEditor
    var value = input.value;
    gCanvasState[textKey].text = value;
    renderTxts(gCanvasState)
}

function editTextSize(input) {
    textKey = document.querySelector('.meme-text-picker').value
    var value = input.value;
    console.log(value);
    gCanvasState[textKey].size = value;
    renderTxts(gCanvasState)
}

function updateModelTxt(changedEl){
    var textKey = changedEl.id;
    gCanvasState[textKey].text = changedEl.innerText 
}


function allowDrop(event) {
    event.preventDefault();
}


function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setDragImage(ev.target,ev.target.offsetWidth/1.5,ev.target.offsetHigth/2);
}

function drop(ev, fatherEl) {
    var data = ev.dataTransfer.getData("text");
        var draggedElement = document.querySelector('#'+data);
    var newTop = (ev.pageY - fatherEl.offsetTop - 50);
    var newLeft = (ev.pageX - fatherEl.offsetLeft - draggedElement.offsetWidth);
    if(newTop < -5 || newTop > fatherEl.clientHeight - draggedElement.clientHeight ) {
        newTop = gCanvasState[data].top;
    }
    if(newLeft < 0) newLeft = 0;
    draggedElement.style.top = newTop  + 'px';
    draggedElement.style.left = newLeft  + 'px';
    gCanvasState[data].top = newTop;
    gCanvasState[data].left = newLeft;
    // console.log(gCanvasState[data].top, newTop)
        console.log(gCanvasState[data].left, newLeft)

}




function addNewText(){
    var textsCounter = 0
    for(prop in gCanvasState){
        if (prop.substring(0,4) === 'text'){
            textsCounter++;
        }
    }
    var textKey = 'text'+(textsCounter+1);
    var newText = {
        text: 'NEW Text',
        fillStyle: 'green',
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

function printOnCanvas(){
    // createCanvasWithImage(gCanvasState);
    // var ghb = document.querySelector('.canvas-container').offsetTop -25;
    var c = document.getElementById("myCanvas");
    for (prop in gCanvasState){
        if (prop.substring(0,4) === 'text'){
                var ctx = c.getContext("2d");
            ctx.font=`${+gCanvasState[prop].size}px ${gCanvasState[prop].fontFamily}`;
            ctx.fillStyle = `${gCanvasState[prop].fillStyle}`;
            ctx.fillText(`${gCanvasState[prop].text}`,`${gCanvasState[prop].left}`,`${gCanvasState[prop].top + (+gCanvasState[prop].size)}`);
        }
    }

}


function convertCanvasToImage() {
	var image = new Image();
	image.src = document.querySelector('canvas').toDataURL("image/png");
	return image;
}

function openModalAndPrintPImage(elImage){
    var elModal = document.querySelector('.modal-img')
    elModal.appendChild(elImage);
    elModal.style.display = 'block'
}

function finishCLicked(){
    printOnCanvas()
    var elImage= convertCanvasToImage();
    openModalAndPrintPImage(elImage)
}