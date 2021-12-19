'use strict';

function renderMemes(){
    document.querySelector('.nav-gallery').classList.remove('active')
    document.querySelector('.nav-memes').classList.add('active')
    document.querySelector('.editor').style.display = 'none'
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.memes').style.display = 'block'
    document.querySelector('.memes-container').innerHTML = ''
    gSavedMems = loadFromStorage(STORAGE_KEY)
    if (gSavedMems === null){
        gSavedMems = []
    }else{
        gSavedMems.forEach(img=> {
            document.querySelector('.memes-container').innerHTML += `<img src="${img}" class="img-pic"></img>`
        })
    }
    
}

