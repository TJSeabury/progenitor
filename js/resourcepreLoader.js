/*
* Resource Preloader
* Reference: https://perishablepress.com/3-ways-preload-images-css-javascript-ajax/
*/

window.onload = function() {
	
	setTimeout(function() {
		
		// XHR to request a JS and a CSS
		var xhr = new XMLHttpRequest();
		
		xhr.open('GET', 'http://domain.tld/preload.js');
		
		xhr.send('');
		
		xhr = new XMLHttpRequest();
		
		xhr.open('GET', 'http://domain.tld/preload.css');
		
		xhr.send('');
		
		// preload image
		new Image().src = "http://domain.tld/preload.css";
		
	}, 1000);
	
};