(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var global = require('./modules/global');
var moduleMappings = require('./modulemappings');

function initModules() {
    
}

function init() {
    /* global js -used on all pages*/
    global.init();

    /* per-page js */
    initModules();

}

(function() {
    init();
})();
},{"./modulemappings":2,"./modules/global":4}],2:[function(require,module,exports){
module.exports = {
    'HEADER': require('./modules/globalheader').init,
    'CONTENTBLOCKS': require('./modules/contentblocks').init
};
},{"./modules/contentblocks":3,"./modules/globalheader":5}],3:[function(require,module,exports){
// required modules


// strings


// DOM elements


// variables

function bindEvents() {

   
    
}

function initContentblocks() {
    bindEvents();
   
}

module.exports = {

    init: function () {
        return initContentblocks();
    }
};
},{}],4:[function(require,module,exports){
// required modules


// strings


// DOM elements


// variables


function bindEvents() {
   
}



function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};


module.exports = {

    init: function() {
        bindEvents();
    },

    debounce: function (func, wait, immediate) {
        return debounce(func, wait, immediate);
    }
};
},{}],5:[function(require,module,exports){
// required modules


// strings


// DOM elements


// variables



function bindEvents() {
   
}



module.exports = {

    init: function () {
        bindEvents();
    }
};
},{}]},{},[1]);
