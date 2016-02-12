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