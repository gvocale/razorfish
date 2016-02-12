(function() {

    /* DOM heroElements */
    var heroItems = document.querySelectorAll('.hero-section');

    /* variables */
    var heroItemsLen = heroItems.length
    var heroTransitionEndEvent = heroWhichTransitionEvent();

    window.addEventListener('scroll', function(e) {
        onScrollEventHandler(e);
    });

    function onScrollEventHandler(e) {
        for (i = 0; i < heroItemsLen; i++) {
            if (isScrolledIntoView(heroItems[i]) && !heroItems[i].classList.contains('reveal')) {
                heroItems[i].classList.add('reveal');
            }
        }
    }

    function isScrolledIntoView(heroElem) {
        var heroElementTop = heroElem.getBoundingClientRect().top;
        var heroElementBottom = heroElem.getBoundingClientRect().bottom;
        var heroIsVisible = (heroElementTop < window.innerHeight) && (heroElementBottom >= 0);
        return heroIsVisible;
    }

    function heroWhichTransitionEvent() {
        var heroT;
        var heroElem = document.createElement('fakeheroElement');
        var heroTransitions = {
            'transition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
        }

        for (heroT in heroTransitions) {
            if (heroElem.style[heroT] !== undefined) {
                return heroTransitions[heroT];
            }
        }
    }

})();
