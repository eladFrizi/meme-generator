
var gCanvasState = {
}



function imgClicked(id, event) {
    var imgObj = findImageObJ(id);
    getCanvasState(imgObj)
    createCanvasWithImage(gCanvasState)
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
        left: 100,
        top: 50,
        size: '30px',
        fontFamily: 'Comic'
    }
}

    function createCanvasWithImage(canvasState) {
        var elImg = new Image();
        elImg.src = canvasState.img.url;
        var canvasSTR = `<canvas id="myCanvas" width="${elImg.width}" height="${elImg.height}" style="border:1px solid #d3d3d3;"
         ondrop="drop_handler(event)">`
        document.querySelector('.canvas-container').innerHTML = canvasSTR;
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.drawImage(elImg, 0, 0);
        ctx.font = canvasState.text1.size + ' ' + canvasState.text1.fontFamily;
        ctx.fillStyle = canvasState.text1.fillStyle;
        ctx.textAlign = canvasState.text1.textAlign;
        ctx.fillText(canvasState.text1.text, canvasState.text1.left, canvasState.text1.top);
    }


    function editText(num, input){
        var textKey = 'text' + num;
        var value = input.value;
        console.log(textKey);
        gCanvasState[textKey].text = value;
        createCanvasWithImage(gCanvasState);
    }



