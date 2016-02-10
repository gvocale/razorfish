(function() {
   
	/* DOM elements */
	var globalHeader = document.querySelector('.navigation');
   
	/* variables */
	var lastY = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
   	   
  	window.addEventListener('scroll', function(e) {
		onScrollEventHandler(e);
	});
	
	function onScrollEventHandler(e) {
		toggleHeaderClass(yDelta());
	}

	function yDelta() {
		thisY = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
		direction = (thisY > lastY) ? "down" : "up";
		lastY = thisY;
		return  direction;
	}

	var toggleHeaderClass = debounce(function (direction) { 
		if ((document.body.scrollHeight ==  document.body.scrollTop + window.innerHeight) || document.body.scrollTop <= 0) {
				globalHeader.classList.remove('hiding');
    	} else {
			if(direction == 'down' && !globalHeader.classList.contains('hiding')) {
				globalHeader.classList.add('hiding');
			} else if (direction == 'up' && globalHeader.classList.contains('hiding')) {
				globalHeader.classList.remove('hiding');
			}
		}
	}, 10);
	
	function debounce(func, wait, immediate) {
		var timeout;
		return function () {
			var context = this, args = arguments;
			var later = function () {
				timeout = null;
				if (!immediate) func.apply(context, args);
			}
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		}
	}

})();