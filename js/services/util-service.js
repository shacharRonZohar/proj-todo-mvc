'use strict'

function formatTime(ts, locale) {
    var date = new Date(ts)
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }
    return date.toLocaleTimeString(locale, options)
}

function getImportanceClass(importance) {
    switch (+importance) {
        case 0:
            return 'low'
        case 1:
            return 'medium'
        case 2:
            return 'high'
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function makeId(length = 5) {
    var txt = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}