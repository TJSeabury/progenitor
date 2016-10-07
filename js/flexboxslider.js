/*
* Description: Controls for the flexbox anything slider.
* 
* Requires: jQuery
*
* Author: Tyler Seabury
*/

(function($){

	var hovered = false,
	suspendClass = "stoponhover",
	sc,
	sw,
	sh,
	tsw;
	
	function moveLeft() {

		$('#slider ul').animate({left: + sw}, 500, function () {

			$('#slider ul li:last-child').prependTo('#slider-wrapper ul');

			$('#slider ul').css('left', '');

		});

	}

	function moveRight() {

		$('#slider ul').animate({left: - sw}, 500, function () {

			$('#slider ul li:first-child').appendTo('#slider-wrapper ul');

			$('#slider ul').css('left', '');

		});

	}

	function getMouseHover(e) {

		var target = $(e.target),
		element = {id: null, class: null};

		if(target.attr("id") !== undefined && target.attr("id") !== null && target.attr("id") !== "") {

			element.id = target.attr("id");

		}
		
		if (target.attr("class") !== undefined && target.attr("class") !== null && target.attr("class") !== "") {

			element.class = target.attr("class");

		}

		return element;

	}
	
	function addClassRecursive(e, c) {
		
		$(e).addClass(c);
		
		$(e).children().each(function() {
			
			$(this).addClass(c);
			
			addClassRecursive($(this), c);
			
		});
		
	}
	
	function TimedRepeatingFunction(fn, t) {
		
		// Properties
		this.interval = setInterval(fn, t); // The interval object
		
		this.fn = fn; // Function: The passed function arg
		
		this.t = t; // Int: The passed time arg
		
		this.running = true; // Boolean: if the interval is running
		
		this.alive = true; // Boolean: if the interval is able to function
		
		this.started = new Date(); // The date object to check time remaining against
		
		this.remainder = null; // The remaining time in the interval
		
		// Methods
		this.start = function() { // Start a stopped timer with saved properties, prevent start if alive and running
			
			if (!this.alive && !this.running) {
				
				this.alive = true;
				
				this.interval = null;
				
				this.interval = setInterval(this.fn, this.t);
				
				this.started = new Date();
				
				this.remainder = null;
				
			} else if (this.alive && !this.running) {
					
				this.resume();
				
				console.log("!! Cannot start TimedRepeatingFunction: it is Alive. Resumed instead. !!");
				
			} else {
				
				console.log("!! Cannot start TimedRepeatingFunction: it is Alive already Running. !!");
				
			}
			
		}
	
		this.stop = function() { // Kills the interval
			
			if (this.interval) {
				
				clearInterval(this.interval);
				
				this.interval = null;
				
				this.alive = false;
				
				this.remainder = null;
				
				this.started = null;
				
			}
			
		}

		this.pause = function() { // Pause the interval
				
			this.running = false;
			
			clearInterval(this.interval);
			
			this.remainder -= new Date() - this.started;
		
		}
		
		this.resume = function() { // Resume the interval
			
			this.running = true;
			
			this.started = new Date();
			
			this.interval = setInterval(fn, t);

		}
	
		this.resetInterval = function() { // start with new interval, stop current interval
			
			this.pause();
			
			setTimeout(this.unPause, this.remainder);
			
		}
		
		this.getRemainder = function() { // Return the time remaining in the interval
			
			if (this.alive && this.running) {
				
				this.remainder -= new Date() - this.started;
				
				return this.remainder;
				
			}
			
			return null;
			
		}
		
	}
	
	function resizeSlider() {
		
		sc = $('#slider ul li').length,
		sw = $('#slider ul li').width(),
		sh = $('#slider ul li').height(),
		tsw = sc * sw;

		$('#slider').css({ width: sw, height: sh });

		$('#slider ul').css({ width: tsw, marginLeft: - sw });

		$('#slider ul li:last-child').prependTo('#slider-wrapper ul');	
		
	}

	$(document).ready(function() {
		
		addClassRecursive($("#slider-wrapper"), suspendClass);

		resizeSlider();
		
		$(window).on('resize', function() {
			
			resizeSlider();
			
		});
		
		var SliderTimer = new TimedRepeatingFunction(moveRight, 5000);

		$('button.control_prev').on("click", function() {

			moveLeft();
			
			SliderTimer.resetInterval();

			return false;

		});

		$('button.control_next').on("click", function() {

			moveRight();
			
			SliderTimer.resetInterval();

			return false;

		});

		$("#slider-wrapper").on("mouseenter", function(){

			if ( SliderTimer.running === true )
				SliderTimer.pause();

		});
		
		$("#slider-wrapper").on("mouseleave",function(){
			
			if ( SliderTimer.running === false )
				SliderTimer.resume();
			
		});

	});

}(jQuery));
