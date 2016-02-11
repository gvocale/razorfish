(function() {

	/* DOM elements */
	var feedItems = document.querySelectorAll('.grid-tile');
	
	/* variables */
   	var feedItemsLen = feedItems.length
   	var transitionEndEvent = whichTransitionEvent();
   
	window.addEventListener('scroll', function(e) {
		onScrollEventHandler(e);
	});
	
	function onScrollEventHandler(e) {
		for (i = 0; i < feedItemsLen; i++) {
			if(isScrolledIntoView(feedItems[i]) && !feedItems[i].classList.contains('reveal')) {
				feedItems[i].querySelector('.grid-tile-content').addEventListener(transitionEndEvent, function(e) {
					this.querySelector('.grid-eyebrow').classList.add('reveal');
					this.querySelector('.grid-headline').classList.add('reveal');
				});
				feedItems[i].classList.add('reveal');
			}
		}
	}
	
	function isScrolledIntoView(elem) {
		var elementTop = elem.getBoundingClientRect().top;
		var elementBottom = elem.getBoundingClientRect().bottom;
		var isVisible = (elementTop < window.innerHeight) && (elementBottom >= 0);
		return isVisible;
	}
	
	function whichTransitionEvent(){
        var t;
        var elem = document.createElement('fakeelement');
        var transitions = {
          'transition':'transitionend',
          'OTransition':'oTransitionEnd',
          'MozTransition':'transitionend',
          'WebkitTransition':'webkitTransitionEnd'
        }

        for(t in transitions){
            if( elem.style[t] !== undefined ){
                return transitions[t];
            }
        }
    }

})();