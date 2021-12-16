'use strict'

var gKeywordSearchCountMap = {'funny': 12, 'cute': 4, 'animal': 16, 'men': 2, 'women': 2}
var gImgs = [
                {id: 1, url: 'img/1.jpg', keywords: ['funny', 'men']},
                {id: 2, url: 'img/2.jpg', keywords: ['animal', 'cute']},
                {id: 3, url: 'img/3.jpg', keywords: ['animal', 'cute']},
                {id: 4, url: 'img/4.jpg', keywords: ['funny', 'men']},
                {id: 5, url: 'img/5.jpg', keywords: ['animal', 'cute']},
                {id: 6, url: 'img/6.jpg', keywords: ['animal', 'cute']},
                {id: 7, url: 'img/7.jpg', keywords: ['funny', 'men']},
                {id: 8, url: 'img/8.jpg', keywords: ['animal', 'cute']},
                {id: 9, url: 'img/9.jpg', keywords: ['animal', 'cute']},
                {id: 10, url: 'img/10.jpg',keywords: ['funny', 'men']},
                {id: 1, url: 'img/11.jpg', keywords: ['funny', 'men']},
                {id: 2, url: 'img/12.jpg', keywords: ['animal', 'cute']},
                {id: 3, url: 'img/13.jpg', keywords: ['animal', 'cute']},
                {id: 4, url: 'img/14.jpg', keywords: ['funny', 'men']},
                {id: 5, url: 'img/15.jpg', keywords: ['animal', 'cute']},
                {id: 6, url: 'img/16.jpg', keywords: ['animal', 'cute']},
                {id: 7, url: 'img/17.jpg', keywords: ['funny', 'men']},
                {id: 8, url: 'img/18.jpg', keywords: ['animal', 'cute']},
            ];

function init(){
    console.log('I am ready')
    renderGallery()
}


function renderGallery(){
    gImgs.forEach(img => document.querySelector('.grid-container').innerHTML += `<div class="item ${img.id}" onclick="onImgSelect(event)"><img class="img-pic" src="${img.url}"/></div>`)
    console.log('renderGallery')
    document.querySelector('.editor').style.display = 'none'
    document.querySelector('.gallery').style.display = 'block'
}


