'use strict'

var gFilterBy = ''

function setFilter(filterBy) {
    gFilterBy = filterBy
}


function getImgsForDisplay() {
    if (gFilterBy === '') return gImgs
    const imgs = gImgs.filter(img =>
        (img.keywords.includes(gFilterBy)))
    return imgs
}


