'use strict'

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,

    lines: [
        {
            txt: 'I sometimes eat Falafel',
            font: 'impact',
            fontSize: 40,
            align: 'left',
            color: 'black',
            fillColor: 'white',
            posX: 10,
            posY: 50

        }
    ]
}

function onImgSelect(ev){
    console.log(ev)
    console.log(ev.path[1].classList[1])
    gMeme.selectedImgId = ev.path[1].classList[1]
    renderMeme()
    renderCanvas()
}

function getMeme(){
    var memeIdx = gMeme.selectedImgId-1
    return memeIdx
}

function setLineTxt(){
    var txtInput = document.getElementById('item').value
    gMeme.lines[0].txt = txtInput
    renderMeme()
}

function onColorChange(pickedColor){
    gMeme.lines[0].color = document.getElementById('color').value
    renderMeme()

}

function onFillColorChange(pickedColor){
    gMeme.lines[0].fillColor = document.getElementById('fill-color').value
    renderMeme()

}

function onChangeFont(pickedfont){
    gMeme.lines[0].font = document.getElementById('fonts').value
    renderMeme()
}

function increseFontSize(){
    gMeme.lines[0].fontSize ++
    renderMeme()    
}

function decreseFontSize(){
    gMeme.lines[0].fontSize --
    renderMeme()    
}

function onClearTxtLine(ev){
    console.log('clearText' , ev)
}

function onAddTxtLine(){
    var newLine = {
        txt: 'write your text here',
        font: 'impact',
        fontSize: 40,
        align: 'left',
        color: 'black',
        fillColor: 'white',
        posX: 10,
        posY: 370
    }
    gMeme.lines.push(newLine)
    renderMeme()
}

function onSwichLines(){
    console.log('before',gMeme)
    var posX1 = gMeme.lines[0].posX
    var posY1 = gMeme.lines[0].posY

    gMeme.lines[0].posX = gMeme.lines[1].posX
    gMeme.lines[0].posY = gMeme.lines[1].posY
    gMeme.lines[1].posX = posX1
    gMeme.lines[1].posY = posY1

    renderCanvas()
    renderMeme()

    
}

// function onSwichLines(){
//     console.log('onswitchlines')
// }