(function() {
	
	/* DOM elements */
	var heroHeaders = document.querySelectorAll('.hero-header');
	
	/* variables */
	var headersLen = heroHeaders.length;
	
	window.addEventListener('scroll', function() {
		assessHeaderVisibility();
	});
	
	
	function assessHeaderVisibility() {
		for (i = 0; i < headersLen; i++) {
			var topPos = heroHeaders[i].offsetTop;
			var headerWidth = heroHeaders[i].clientWidth;
			heroHeaders[i].style.clip = 'rect(' + -1*(window.pageYOffset - heroHeaders[i].parentNode.offsetTop +topPos) + 'px, ' + headerWidth + 'px, ' + ((-1*(window.pageYOffset - heroHeaders[i].parentNode.offsetTop)) + heroHeaders[i].parentNode.clientHeight - topPos)  + 'px, 0px)';
		}
	}
	
	assessHeaderVisibility();

})();
