/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/




jQuery(document).ready(function($) {

  //$("header").css("background", "#161415 url('images/header-background.jpg') no-repeat top center");

  function isElementInViewport(elem) {
    var $elem = $(elem);

    if($elem.offset() != undefined) {

      // Get the scroll position of the page.
      var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
      var viewportTop = $(scrollElem).scrollTop();
      var viewportBottom = viewportTop + $(window).height();

      // Get the position of the element on the page.
      var elemTop = Math.round($elem.offset().top);
      var elemBottom = elemTop + $elem.height();

      return ((elemTop < viewportBottom) && (elemBottom > viewportTop));

    }
  }

  // Check if it's time to start the animation.
  function checkAnimation() {
      

    if (isElementInViewport($('.bars'))) {
      var $elem = $('.bar');
      // Start the animation
      $elem.addClass('animate-bar');
    }
  }

  $(window).scroll(function(){
      checkAnimation();
  });
  checkAnimation();

/*----------------------------------------------------*/
/* Animation Settings
------------------------------------------------------ */


  setTimeout(function() {
    $(".scrolldown").fadeIn(1000);
	}, 2500);

  setTimeout(function() {
    $("ul.social").fadeIn(1000);
  }, 2000);

  setTimeout(function() {
    $(".description").fadeIn(1000);
  }, 1500);






/*----------------------------------------------------*/
/* Smooth Scrolling
------------------------------------------------------ */

  var sectionHandler = function(event, direction) {

    //var active_section;

    //active_section = $(this);
    //if (direction === "up") active_section = active_section.prev();
    var hash = window.location.hash.substr(1);

    var active_link = $('#nav-wrap a[href="#' + hash + '"]');

    navigation_links.parent().removeClass("current");
    active_link.parent().addClass("current");

  };

  $('.smoothscroll').on('click',function (e) {
    e.preventDefault();

    var target = this.hash,
    $target = $(target);

    $('html, body').stop().animate({
        'scrollTop': $target.offset().top
    }, 800, 'swing', function () {
        window.location.hash = target;
        sectionHandler(null, null);
    });
	});


  function onVisibilityChange(el, callback) {
    var old_visible;
    return function () {
        var visible = isElementInViewport(el);
        if (visible != old_visible) {
            old_visible = visible;
            if (typeof callback == 'function') {
                callback();
            }
        }
    }
  }


  $("#nav-wrap a").each(function(el) {
    onVisibilityChange(el, function() {
      /* your code go here */

      var active_link = $('#nav-wrap a[href="#' + hash + '"]');

      navigation_links.parent().removeClass("current");
      el.addClass("current");
    });
  })


/*----------------------------------------------------*/
/* Highlight the current section in the navigation bar
------------------------------------------------------*/

	var sections = $("section");
	var navigation_links = $("#nav-wrap a");

	sections.waypoint({

    handler: sectionHandler,
		offset: '35%'

	});

  setTimeout(function() {
    //$("div").removeClass("typewriter");
    $(".typewriter h1").css("animation", "none");
    $(".typewriter h1").css("border-right", "none");

  }, 4000);
  


/*----------------------------------------------------*/
/*	Make sure that #header-background-image height is
/* equal to the browser height.
------------------------------------------------------ */

  $('header').css({ 'height': $(window).height() });
  $(window).on('resize', function() {

    $('header').css({ 'height': $(window).height() });
    $('body').css({ 'width': $(window).width() })
  });


/*----------------------------------------------------*/
/*	Fade In/Out Primary Navigation
------------------------------------------------------*/

  var setMenuOpaqueness = function() {

    var h = $('header').height();
    var y = $(window).scrollTop();
    var nav = $('#nav-wrap');

    if ( (y > h*.20) && (y < h) && ($(window).outerWidth() > 768 ) ) {
      nav.fadeOut('fast');
    }
    else {
      if (y < h*.20) {
        nav.removeClass('opaque').fadeIn('fast');
      }
      else {
        nav.addClass('opaque').fadeIn('fast');
      }
    }

  };

  $(window).on('scroll', setMenuOpaqueness);
  setMenuOpaqueness();


/*----------------------------------------------------*/
/*	Modal Popup
------------------------------------------------------*/

  $('.item-wrap a').magnificPopup({

    type:'inline',
    fixedContentPos: false,
    removalDelay: 200,
    showCloseBtn: false,
    mainClass: 'mfp-fade'

  });

  $(document).on('click', '.popup-modal-dismiss', function (e) {
  	e.preventDefault();
  	$.magnificPopup.close();
  });


/*----------------------------------------------------*/
/*	Flexslider
/*----------------------------------------------------*/
 $('.flexslider').flexslider({
    namespace: "flex-",
    controlsContainer: ".flex-container",
    animation: 'slide',
    controlNav: true,
    directionNav: false,
    smoothHeight: true,
    slideshowSpeed: 7000,
    animationSpeed: 600,
    randomize: false,
 });

/*----------------------------------------------------*/
/*	contact form
------------------------------------------------------*/

   // $('form#contactForm button.submit').click(function() {

   //    $('#image-loader').fadeIn();

   //    var contactName = $('#contactForm #contactName').val();
   //    var contactEmail = $('#contactForm #contactEmail').val();
   //    var contactSubject = $('#contactForm #contactSubject').val();
   //    var contactMessage = $('#contactForm #contactMessage').val();

   //    var data = 'contactName=' + contactName + '&contactEmail=' + contactEmail +
   //             '&contactSubject=' + contactSubject + '&contactMessage=' + contactMessage;

   //    $.ajax({

	  //     type: "POST",
	  //     url: "inc/sendEmail.php",
	  //     data: data,
	  //     success: function(msg) {

   //          // Message was sent
   //          if (msg == 'OK') {
   //             $('#image-loader').fadeOut();
   //             $('#message-warning').hide();
   //             $('#contactForm').fadeOut();
   //             $('#message-success').fadeIn();   
   //          }
   //          // There was an error
   //          else {
   //             $('#image-loader').fadeOut();
   //             $('#message-warning').html(msg);
	  //           $('#message-warning').fadeIn();
   //          }

	  //     }

   //    });
   //    return false;
   // });


});

// Cache selectors
var topMenu = $(".main-menu");
topMenuHeight = topMenu.outerHeight() + 15;
// All list items
menuItems = topMenu.find("a");
// Anchors corresponding to menu items
scrollItems = menuItems.map(function() {
  var item = $($(this).attr("href"));
  if (item.length) { return item; }
});

// Bind to scroll
$(window).scroll(function() {
   // Get container scroll position
   var fromTop = $(this).scrollTop() + topMenuHeight;

   // Get id of current scroll item
   var cur = scrollItems.map(function() {
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length - 1];
   var id = (cur && cur.length) ? cur[0].id : "";
   // Set/remove active class
   menuItems.parent().removeClass("current")
            .end().filter("[href='#" + id + "']").parent().addClass("current");
});