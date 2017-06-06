
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
    gCanvasState.img = imgObj;
    gCanvasState.text1 = {
        text: 'edit me text1',
        fillStyle: 'red',
        textAlign: 'center',
        left: 0,
        top: 100,
        size: 30,
        fontFamily: 'fantasy'
    }
    gCanvasState.text2 = {
        text: 'edit me text2',
        fillStyle: 'red',
        textAlign: 'left',
        left: 100,
        top: 200,
        size: 30,
        fontFamily: 'fantasy'
    }
}

function createCanvasWithImage(canvasState) {
    var elImg = new Image();
    elImg.src = canvasState.img.url;
    var canvasSTR = `<canvas id="myCanvas" width="${elImg.width}" height="${elImg.height}" style="border:1px solid #d3d3d3;">`
    document.querySelector('.canvas-container').innerHTML = canvasSTR;
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.drawImage(elImg, 0, 0);

    console.log(canvasSTR)
}


function editText(num, input) {
    var textKey = 'text' + num;
    var value = input.value;
    console.log(textKey);
    gCanvasState[textKey].text = value;
    renderTxts(gCanvasState)
}


// function renderTxts(state) {
//     createCanvasWithImage(state)
//     for (prop in state) {
//         var checker = prop.substring(0, 4)
//         if (checker === 'text') {
//             var c = document.getElementById("myCanvas");
//             var textKey = state[prop];
//             var ctx = c.getContext("2d");
//             ctx.font = textKey.size + 'px ' + textKey.fontFamily;
//             ctx.fillStyle = textKey.fillStyle;
//             ctx.textAlign = textKey.textAlign;
//             ctx.fillText(textKey.text , textKey.left + textKey.size, textKey.top + textKey.size);
//         }
//     }
// }


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
            divOverCanvas.style.width = '100%';
            divOverCanvas.style.overflowWrap = 'break-word';
            divOverCanvas.style.top = textKey.top + 'px';
            console.log(divOverCanvas.style.top)
            divOverCanvas.style.fontSize = textKey.size + 'px';
            divOverCanvas.style.textAlign = textKey.textAlign;
            divOverCanvas.style.fontFamily = textKey.fontFamily;
            divOverCanvas.style.zIndex = 50;
            divOverCanvas.setAttribute('ondragstart', "drag(event)")
            divOverCanvas.setAttribute('draggable', "true")
            canvasCover.appendChild(divOverCanvas)
        }
    }
}



function editTextSize(num, input) {
    var textKey = 'text' + num;
    var value = input.value;
    console.log(value);
    gCanvasState[textKey].size = value;
    renderTxts(gCanvasState)
}





function allowDrop(event) {
    event.preventDefault();
}


function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev, eleme) {
    var data = ev.dataTransfer.getData("text");
    console.log(eleme)
    var newTop = (ev.pageY - eleme.offsetTop - 50) ;
        console.log('oldtop', document.querySelector('#'+data).style.top)

    document.querySelector('#'+data).style.top = newTop  + 'px';
    gCanvasState[data].top = newTop;
    console.log('newTop', newTop);
}
