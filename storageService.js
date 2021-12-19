'use strict';

function saveToStorage(key, val) {
    localStorage.setItem(key, val)
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    gSavedMems = JSON.parse(val)
    return JSON.parse(val)
}