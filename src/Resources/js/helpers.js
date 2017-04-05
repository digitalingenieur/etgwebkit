(function($) {

    var $body = $('body');

    //Touch?
    if(('ontouchstart' in window)
    || (navigator.MaxTouchPoints > 0)
    || (navigator.msMaxTouchPoints > 0)){
        $body.addClass('is-touch');
    }

    objectFitImages();

    function addEvent(el, eventType, handler) {
	  if (el.addEventListener) { // DOM Level 2 browsers
	    el.addEventListener(eventType, handler, false);
	  } else if (el.attachEvent) { // IE <= 8
	    el.attachEvent('on' + eventType, handler);
	  } else { // ancient browsers
	    el['on' + eventType] = handler;
	  }
	}

	//Hamburger Menu
	var hamburger = document.querySelector(".hamburger");
	addEvent(hamburger, 'click', function () {
	  var mainmenu = document.querySelector(".nav-header");
	  	if(mainmenu.classList.contains('invisible')){
	  		mainmenu.classList.remove('invisible');		
	  	}
	  	else{
	  		mainmenu.classList.add('invisible');		
	  	}

	  	if(this.classList.contains('is-active')){
	  		this.classList.remove('is-active');
	  	}
	  	else{
	  		this.classList.add('is-active');
	  	}
	  
	});


	//Submenu
	var elements = document.querySelectorAll("a.submenu");
	for(var i in elements){
		var element = elements[i]; 
		var parElement = element.parentNode;

		addEvent(element, 'click', function (event) {
		  event.preventDefault();
		  //Element which is open
		  /*var activeElement = document.querySelector(".submenu-active");

		  //this represents clicked a - Tag
		  if(this.parentNode.classList.contains('submenu-active')){
		  	this.parentNode.classList.remove('submenu-active');
		  }
		  else{
		  	if(activeElement){
		  		activeElement.classList.remove('submenu-active');
		  	}
		  	this.parentNode.classList.add('submenu-active');
		  }*/
		  
		  return false;
		});
	}

})(jQuery);
