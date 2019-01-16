(function($) {

    var $body = $('body');

    //Touch?
    if(('ontouchstart' in window)
    || (navigator.MaxTouchPoints > 0)
    || (navigator.msMaxTouchPoints > 0)){
        $body.addClass('is-touch');
    }

    objectFitImages();

    //Smoothscroll
    $('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, '1000', 'swing');
				return false;
			}
		}
	});

    function toggleMainMenu(){
		$(".nav-head").toggleClass('invisible');
		$(".hamburger").toggleClass('is-active');
	}

	$(".hamburger").click(function(){
		toggleMainMenu();
	});
	$(".nav-head a").click(function(){
		toggleMainMenu();
	});
	
})(jQuery);
