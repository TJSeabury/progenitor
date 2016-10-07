/*
* Description: Hacky replacement for prettyphoto functionality (This works in tandem
* with php code in functions.php) and hijacking anchor hrefs.
* This builds the urls based upon the image's alt attribute, hence
* placing an instagram users @handle in the image's alt field in the wordpress
* media library will result in each image in the grid being linked to their
* respective instagram account pages.
*
* Author: Tyler Seabury
*/

var urls = {};

(function($){

	$(document).ready(function(){

		// This is important! Script must wait for prettyphoto and visual composer
		// to finish building the page even after document is ready.
		setTimeout(function(){

			// Builds the urls
			$("a.prettyphoto").each(function(){

				var alt;

				if($(this).next("img").attr("alt") !== null && $(this).attr("title") !== undefined && $(this).next("img").attr("alt") !== ""){

					alt = String($(this).next("img").attr("alt")).replace("@", "");
					
					if (alt === "placeholder")
						alt = "ambassadors";

				}

				if($(this).attr("title") !== null && $(this).attr("title") !== undefined && $(this).attr("title") !== ""){
					
					var URI = "https://www.instagram.com/";
					
					if ( alt === "ambassadors" )
						URI = "http://adoratresses.com/";

					urls[String($(this).attr("title"))] = URI + alt;

				}

			});

			//Intercepts prettyphoto and link functionality
			$("a.prettyphoto").click(function(e){

				e.stopImmediatePropagation();

				var url = urls[String($(this).attr("title"))],

				win = window.open(url, '_blank');

				if (win) {

					win.focus();

				} else {

					alert('Opening link prevented. Please disable popup blocker for this site.');

				}

				return false;

			});

		}, 500);

	});

}(jQuery));