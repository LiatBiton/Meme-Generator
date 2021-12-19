'use strict'


const STORAGE_KEY = 'MemesDB';
var gSavedMems = []

var gCurrLineIdx = 0

function getDefaultLine() {
    return {
        isDrag: false,
        id: 0,
        txt: '',
        type: 'line',
        font: 'impact',
        size: 30,
        align: 'center' ,
        color: '#000000',
        fillColor: '#ffffff',
        posX: 200,
        posY: 50
    }
}

var gCurrElement = getDefaultLine();
var gMeme = {}

function onImgSelect(ev){
    console.log(ev)
    console.log(ev.path[1].classList[1])
    gMeme.selectedImgId = ev.path[1].classList[1]
    document.querySelector('.btn-save').style.background = '#ff7f00'
    document.querySelector('.btn-create').style.display = 'none'
    document.querySelector('.btn-save').disabled = false
    delete gMeme.emojis
    gCurrLineIdx = 0
    var line = getDefaultLine()
    gCurrElement = line
    gMeme.lines = [line]
    renderMeme()
    renderCanvas()
}

function getMeme(){
    var memeIdx = gMeme.selectedImgId-1
    return memeIdx
}

function getCurrLine() {
    if (gCurrElement.type != "line") return {}

    return gMeme.lines.find((curr) => curr.id === gCurrElement.id) || {}
}

function setLineTxt(){
    getCurrLine().txt = document.getElementById('item').value
    renderMeme()
}

function onColorChange(pickedColor){
    getCurrLine().color = pickedColor
    renderMeme()
}

function onFillColorChange(pickedColor){
    getCurrLine().fillColor = pickedColor
    renderMeme()
}

function onChangeFont(){
    getCurrLine().font = document.getElementById('fonts').value
    renderMeme()
}

function increseSize(){
    var incBy = gCurrElement.type === "line" ? 1 : 10
    gCurrElement.size += incBy
    renderMeme()
}

function decreseSize(){
    var decBy = gCurrElement.type === "line" ? 1 : 10
    gCurrElement.size -= decBy
    renderMeme()  
}

function onClearTxtLine(){
    if (gCurrElement.type === 'line'){
        var gCurrIdx = gMeme.lines.findIndex(l => l.id === gCurrElement.id)
        gMeme.lines.splice(gCurrIdx)
    }else if (gCurrElement.type === "emoji") {
        var gCurrIdx = gMeme.emojis.findIndex(e => e.id === gCurrElement.id)
        gMeme.emojis.splice(gCurrIdx)
    }
    gCurrElement = null
    renderMeme()
}

function onAlign(side){
    getCurrLine().align = side
    renderMeme()
}

function onAddTxtLine(){
    var newLine = {
        id: gMeme.lines.length,
        isDrag: false,
        txt: '',
        font: 'impact',
        type: 'line',
        size: 30,
        align: 'center',
        color: '#000000',
        fillColor: '#ffffff'
    }
    if(gMeme.lines.length === 0) {
        newLine.posX = 200
        newLine.posY = 50
    } else if(gMeme.lines.length === 1) {
        newLine.posX = 200
        newLine.posY = 370
    } else {
        newLine.posX = 200
        newLine.posY = 210
    }
    gCurrLineIdx = newLine.id
    document.getElementById('item').value = ""
    gCurrElement = newLine
    gMeme.lines.push(newLine)
    renderMeme()
}

function onSwichLines(){
    var posX1 = gMeme.lines[0].posX
    var posY1 = gMeme.lines[0].posY

    gMeme.lines[0].posX = gMeme.lines[1].posX
    gMeme.lines[0].posY = gMeme.lines[1].posY
    gMeme.lines[1].posX = posX1
    gMeme.lines[1].posY = posY1

    renderCanvas()
    renderMeme()   
}


function onSave(){
    document.querySelector('.btn-save').disabled = true
    document.querySelector('.btn-save').style.background = 'silver'
    document.querySelector('.btn-create').style.display = 'block'
    gCurrLineIdx = ''
    renderMeme()
    var mime = gElCanvas.toDataURL('image/png');
    gSavedMems.unshift(mime)
    saveToStorage(STORAGE_KEY, gSavedMems)
}


function addEmoji(event){
    var url = event.path[0].attributes[1].nodeValue
    var newEmoji = {
        id: gMeme.emojis?.length || 0,
        url: url , 
        posX: 100, 
        posY: 100, 
        size: 100,
        isDrag: false,
        type: 'emoji'
    }
    gCurrElement = newEmoji

    if(gMeme.emojis ===  undefined){
        gMeme.emojis = [newEmoji]

    }else{
        gMeme.emojis.push(newEmoji)
    }
    renderMeme()
}

