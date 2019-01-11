
jQuery(window).on("load", function () {
	"use strict";
	jQuery("#loader").delay(1000).fadeToggle("medium");
	/*$('.textarea_editor').wysihtml5({
		html: true
	});*/
})

$('.dropdown').on('show.bs.dropdown', function(e){
	$(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
});
$('.dropdown').on('hide.bs.dropdown', function(e){
	$(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
});

