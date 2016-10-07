/*
* Description: Handles the functionality of the sticky header.
*
* Author: Tyler Seabury
*/

(function($){

	$(document).ready(function(){

		var doc = $(this),
		header = $("header"),
		dst,
		hvo = header.offset(),
		resizeEvent = false;

		$(window).resize(function() {

			resizeEvent = true;

		});

		dst = doc.scrollTop();

		if(dst > (hvo.top - 100)) {

			header.addClass("stucktop");

		}

		doc.on("scroll", function(){

			dst = doc.scrollTop();

			if(resizeEvent) {

				hvo = header.offset();

				resizeEvent = false;

			}

			if(dst > (hvo.top - 100)) {

				header.addClass("stucktop");

			} else if (dst < (hvo.top - 85)) {

				header.removeClass("stucktop");

			}

		});

	});

}(jQuery));