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