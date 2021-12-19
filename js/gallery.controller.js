'use strict'

var gKeywordSearchCountMap = {'funny': 12, 'cute': 4, 'animal': 16, 'men': 2, 'women': 2}
var gImgs = [
                {id: 1, url: 'img/1.jpg', keywords: ['Celebrity', 'Funny']},
                {id: 2, url: 'img/2.jpg', keywords: ['Cute']},
                {id: 3, url: 'img/3.jpg', keywords: ['Cute']},
                {id: 4, url: 'img/4.jpg', keywords: ['Cute']},
                {id: 5, url: 'img/5.jpg', keywords: ['Funny', 'Cute' , 'Serious']},
                {id: 6, url: 'img/6.jpg', keywords: ['Celebrity' , 'Serious']},
                {id: 7, url: 'img/7.jpg', keywords: ['funny', 'men']},
                {id: 8, url: 'img/8.jpg', keywords: ['Cute']},
                {id: 9, url: 'img/9.jpg', keywords: ['Funny' , 'Cute']},
                {id: 10, url: 'img/10.jpg',keywords: ['Celebrity', 'Funny']},
                {id: 11, url: 'img/11.jpg', keywords: ['Celebrity']},
                {id: 12, url: 'img/12.jpg', keywords: ['Celebrity']},
                {id: 13, url: 'img/13.jpg', keywords: ['Celebrity' , 'Serious']},
                {id: 14, url: 'img/14.jpg', keywords: ['Afraid' , 'Serious']},
                {id: 15, url: 'img/15.jpg', keywords: ['Celebrity', 'Serious']},
                {id: 16, url: 'img/16.jpg', keywords: ['Celebrity', 'Funny']},
                {id: 17, url: 'img/17.jpg', keywords: ['Celebrity' , 'Serious']},
                {id: 18, url: 'img/18.jpg', keywords: ['Afraid']},
            ];

function init(){
    console.log('I am ready')
    renderGallery()
}

function renderGallery(){
    document.querySelector('.grid-container').innerHTML = ''
    const imgs = getImgsForDisplay();
    imgs.forEach(img => document.querySelector('.grid-container').innerHTML += `<div class="item ${img.id}" onclick="onImgSelect(event)"><img class="img-pic" src="${img.url}"/></div>`)
    console.log('renderGallery')
    showGallery()   
}

function showGallery(){
    document.querySelector('.nav-memes').classList.remove('active')
    document.querySelector('.nav-gallery').classList.add('active')
    document.querySelector('.memes').style.display = 'none'
    document.querySelector('.editor').style.display = 'none'
    document.querySelector('.gallery').style.display = 'block'
}

function onSelectFilter(filterBy){
    console.log('Filtering By', filterBy);
    setFilter(filterBy)
    renderGallery()
}

