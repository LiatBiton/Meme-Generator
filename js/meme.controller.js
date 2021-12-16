'use strict'
var gElCanvas = document.getElementById('my-canvas')
var gCtx = gElCanvas.getContext('2d')

function renderCanvas(){
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.editor').style.display = 'block'
    window.addEventListener("keyup", setLineTxt, true);
}

function renderMeme(){
    var idx = getMeme()
    var img = new Image()
    img.src = gImgs[idx].url
    gCtx.drawImage(img, 0, 0, 400, 400);

    gMeme.lines.forEach(line=> {
        gCtx.font = `${line.fontSize}px ${line.font}`;
        gCtx.strokeStyle = line.color;
        gCtx.fillStyle = line.fillColor;
        gCtx.fillText(line.txt,line.posX , line.posY)
        gCtx.strokeText(line.txt,line.posX , line.posY)
        

    })

       
};


