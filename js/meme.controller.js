'use strict'
var gElCanvas = document.getElementById('my-canvas')
var gCtx = gElCanvas.getContext('2d')
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']


function renderCanvas(){
    document.querySelector('.memes').style.display = 'none'
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.editor').style.display = 'block'
    addListeners()
}

function renderMeme(){
    var idx = getMeme()
    var img = new Image()
    img.src = gImgs[idx].url
    gCtx.drawImage(img, 0, 0, 400, 400);

    if(gMeme.emojis != undefined){
        gMeme.emojis.forEach(emoj=>{
            var emoji = new Image()
            emoji.src = emoj.url
            gCtx.drawImage(emoji, emoj.posX, emoj.posY, emoj.size, emoj.size);
        })
    }

    document.getElementById('item').value = gCurrElement?.txt || ''
    document.getElementById('fonts').value = gCurrElement?.font || ''
    document.querySelector('.border-color').value = gCurrElement?.color || ''
    document.querySelector('.fill-color').value = gCurrElement?.fillColor || ''

    gMeme.lines.forEach(line=> {
        gCtx.beginPath();
        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.strokeStyle = line.color;
        gCtx.fillStyle = line.fillColor;
        gCtx.textAlign = line.align; 
        gCtx.setLineDash([0, 0]);
        gCtx.lineWidth = '2'
        gCtx.fillText(line.txt,line.posX , line.posY)
        gCtx.strokeText(line.txt,line.posX , line.posY)
        gCtx.closePath();
    })

    drawTxtBox()

    return gCtx     
};

function canvasClicked(ev){
    var x = ev.layerX
    var y = ev.layerY
    console.log(x,y)
    var clicked = getClickedElement(x,y)
    gCurrElement = clicked || gMovingElement;
    renderMeme()
}


function getClickedElement(x,y) {
    var clickedElement = null;

    clickedElement = getLineInPosition(x, y);

    if (!clickedElement) {
        clickedElement = getEmojiInPosition(x,y);    
    }

    return clickedElement;
}

function getEmojiInPosition(x,y) {
    var foundEmoji = null;

    if (!gMeme.emojis) return foundEmoji

    gMeme.emojis.forEach(emoji=>{
        if (x >= emoji.posX && x <= emoji.posX+emoji.size &&
            y >= emoji.posY && y <= emoji.posY+emoji.size) {
            foundEmoji = emoji
        }
    })

    return foundEmoji;
}

function getLineInPosition(x,y) {
    var foundLine = null;

    if (!gMeme.lines) return foundLine

    gMeme.lines.forEach(line => {
        if (x >= line.posX-150 && x <= line.posX + 300 &&
            y >= line.posY-40 && y <= line.posY + 50) {
            foundLine = line
        }
    })

    return foundLine;
}

function drawTxtBox(){
    var x = gCurrElement.posX
    var y = gCurrElement.posY
    console.log("gCurrElement : ", x, y)

    gCtx.beginPath();

    if(gCurrElement.type === 'line'){
        gCtx.rect(x-150, y-40, 300, 50);
    } else if (gCurrElement.type === 'emoji') {
        gCtx.rect(x, y, gCurrElement.size, gCurrElement.size);
    }

    gCtx.strokeStyle = 'black';
    gCtx.setLineDash([4, 2]);
    gCtx.lineWidth = '2'
    gCtx.rect.cursor= 'pointer'
    gCtx.stroke();
    gCtx.closePath();
}


function addListeners() {
    addMouseListeners()
    addTouchListeners()
    // window.addEventListener('resize', () => {
    //     resizeCanvas()
    //     const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    //     createCircle(center)
    //     renderCanvas()
    // })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    // gElCanvas.addEventListener('touchstart', onDown)
    // gElCanvas.addEventListener('touchmove', onMove)
    // gElCanvas.addEventListener('touchend', onUp)
}

var gStartPos;
var gMovingElement;

function onDown(ev) {
    const pos = getEvPos(ev)
    var currClicked = getClickedElement(pos.x, pos.y)
    if (!currClicked) return
    gMovingElement = currClicked;
    gCurrElement = currClicked;
    
    setIsDragging(gMovingElement, true);
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    if (!gMovingElement || !gMovingElement.isDrag) return

    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveElement(gMovingElement, dx, dy)
    gStartPos = pos
    gCurrElement = gMovingElement
    renderMeme()
}

function onUp() {
    setIsDragging(gMovingElement, false);
    document.body.style.cursor = 'grab'
}

// function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas-container')
//     gElCanvas.width = elContainer.offsetWidth
//     gElCanvas.height = elContainer.offsetHeight
// }

function getEvPos(ev) {
    
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    console.log("getEvPos", pos)

    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            // x: ev.pageX - ev.target.offsetLeft,
            // y: ev.pageY - ev.target.offsetTop
            x: ev.pageX + pos.x,
            y: ev.pageY + pos.y
        }
    }
    return pos
}

function setIsDragging(element, isDrag) {
    element.isDrag = isDrag
}

function moveElement(element, dx, dy) {
    var currEl = {};
    if (element.type === "line")
        currEl = gMeme.lines.find((e) => e.id === element.id)
    else if (element.type === "emoji")
        currEl = gMeme.emojis.find((e) => e.id === element.id)

    console.log("Movning ", currEl);
    currEl.posX += dx
    currEl.posY += dy
    element.posX += dx
    element.posY += dy
}