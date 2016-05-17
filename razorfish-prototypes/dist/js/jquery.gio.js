// This is the jQuery I am using on the various pages






// Video





$(function() {
    console.log('jquery works');


    // If site-masthead__checkbox is checked, then toggle overflow:hidden to body, so that the rest of tha page doesn't scroll

    $('#site-masthead__checkbox').change(function() {
        if (this.checked) {
            console.log('open navigation');
            $('html,body').css('overflow-y', 'hidden');
        } else {
            $('html,body').css('overflow-y', 'auto');
        }
    });


    // Contact-form, toggling classes when overlay is open

    $(".contact-form__link").click(function() {
        console.log('open form');

        // Scroll page so that the form hero alignes with viewport
        $.fn.scrollView = function() {
            return this.each(function() {
                $('html, body').animate({
                    scrollTop: $(this).offset().top
                }, 400);
            });
        }
        $('#contact-form__hero').scrollView();
        $("html,body").css("overflow-y", "hidden");

        setTimeout(function() {
            $(".contact-form__overlay").addClass("display");

        }, 405);
        setTimeout(function() {

            $(".contact-form__background-image").addClass("visible blur scale");
        }, 410);
        setTimeout(function() {
            $(".contact-form__form-group").addClass("display");
            $(".contact-form__form-group").addClass("open");
        }, 500);
    });

    $(".contact-form__back").click(function() { // On click on Back button
        $(".contact-form__form-group").removeClass("open").addClass("hide");
        setTimeout(function() {
            $(".contact-form__background-image").removeClass("visible blur scale");
        }, 100);
        setTimeout(function() {
            $(".contact-form__overlay").removeClass("display");
            $(".contact-form__form-group").removeClass("display");
            $('html,body').css('overflow-y', 'auto');
        }, 510);
    });


    $('#form__submit').click(function() { // On click on Sumbit button
        $(this).addClass("loading");
        setTimeout(function() {
            $('#form__submit').addClass("spin");
        }, 300);
        setTimeout(function() {
            $('#form__submit').addClass("filling");
            $('#form__submit').removeClass("spin");
        }, 3300);
        setTimeout(function() {
            $('#form__submit').addClass("tick");
        }, 3600);
        setTimeout(function() {
            $(".contact-form__form-group").removeClass("open").addClass("hide");
        }, 5600);
        setTimeout(function() {
            $(".contact-form__background-image").removeClass("blur scale");
        }, 5700);
        setTimeout(function() {
            $(".contact-form__form-group").removeClass("display");
            $('#form__submit').removeClass("loading filling tick");
            $(".contact-form__confirmation-group").addClass("display");
        }, 5810);
        setTimeout(function() {
            $(".contact-form__confirmation-group").addClass("open");
        }, 5900);
        setTimeout(function() {
            $(".contact-form__confirmation-group").removeClass("open").addClass("hide");
        }, 8900);
        setTimeout(function() {
            $(".contact-form__confirmation-group").removeClass("display");
            $(".contact-form__background-image").removeClass("visible");
            $('html,body').css('overflow-y', 'auto');
        }, 9110);
        setTimeout(function() {
            $(".contact-form__overlay").removeClass("close display");
        }, 9320);
    });


    // Form: if in select.form__select an option is selected, add class .selected
    $(".form__select").each(function() {
        $(this).change(function() {
            $(this).addClass("selected");
        });
    });

    // Form: if form__radio is selected, add class .selected, and remove it from other .form__radio
    $('.form__radio').each(function() {
        $(this).change(function() {
            if (this.checked) {
                console.log("bla");
                $(this).parent().addClass("selected");
                $('.form__radio').not(this).each(function() {
                    $(this).parent().removeClass("selected");
                });
            }
        })
    });









    // Check if .form__textarea is empty. If so add class not-empty, so that the placeholder label can move above text-area

    $('.form__textarea').change(function() {
        if ($.trim($(this).val()).length < 1) {
            $(this).removeClass("filled");
        } else {
            $(this).addClass("filled");
        }
    });

    if ($.trim($(".form__textarea").val())) {
        // textarea is not empty or doesn't contains only white-space
        $(this).addClass("not-empty");
    }


    // This script shows the name of the file selected into attachment, or the number of files selected 
    'use strict';;
    (function($, window, document, undefined) {
        $('.form__file').each(function() {
            var $input = $(this),
                $label = $(".form__attachment--attachment"),
                labelVal = $label.html();

            $input.on('change', function(e) {
                var fileName = '';

                if (this.files && this.files.length > 1) {
                    fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
                    $('.form__attachment').addClass("active");
                } else if (e.target.value) {
                    fileName = e.target.value.split('\\').pop();
                    $('.form__attachment').removeClass("active");
                }


                if (fileName) {
                    $label.find('span').html(fileName);
                    $('.form__attachment').addClass("active");
                } else {
                    $label.html(labelVal);
                    $('.form__attachment').removeClass("active");
                }

            });

            // Firefox bug fix
            $input
                .on('focus', function() {
                    $input.addClass('has-focus');
                })
                .on('blur', function() {
                    $input.removeClass('has-focus');
                });
        });
    })(jQuery, window, document);



    // Autogrow textarea if more text then a line is entered
    ;
    (function($) {
        //pass in just the context as a $(obj) or a settings JS object
        $.fn.autogrow = function(opts) {
            var that = $(this).css({
                    overflow: 'hidden',
                    resize: 'none'
                }) //prevent scrollies
                ,
                selector = that.selector,
                defaults = {
                    context: $(document) //what to wire events to
                        ,
                    animate: true //if you want the size change to animate
                        ,
                    speed: 200 //speed of animation
                        ,
                    fixMinHeight: true //if you don't want the box to shrink below its initial size
                        ,
                    cloneClass: 'autogrowclone' //helper CSS class for clone if you need to add special rules
                        ,
                    onInitialize: false //resizes the textareas when the plugin is initialized
                };
            opts = $.isPlainObject(opts) ? opts : {
                context: opts ? opts : $(document)
            };
            opts = $.extend({}, defaults, opts);
            that.each(function(i, elem) {
                var min, clone;
                elem = $(elem);
                //if the element is "invisible", we get an incorrect height value
                //to get correct value, clone and append to the body. 
                if (elem.is(':visible') || parseInt(elem.css('height'), 10) > 0) {
                    min = parseInt(elem.css('height'), 10) || elem.innerHeight();
                } else {
                    clone = elem.clone()
                        .addClass(opts.cloneClass)
                        .val(elem.val())
                        .css({
                            position: 'absolute',
                            visibility: 'hidden',
                            display: 'block'
                        });
                    $('body').append(clone);
                    min = clone.innerHeight();
                    clone.remove();
                }
                if (opts.fixMinHeight) {
                    elem.data('autogrow-start-height', min); //set min height                                
                }
                elem.css('height', min);

                if (opts.onInitialize && elem.length) {
                    resize.call(elem[0]);
                }
            });
            opts.context
                .on('keyup paste', selector, resize);

            function resize(e) {
                var box = $(this),
                    oldHeight = box.innerHeight(),
                    newHeight = this.scrollHeight,
                    minHeight = box.data('autogrow-start-height') || 0,
                    clone;
                if (oldHeight < newHeight) { //user is typing
                    this.scrollTop = 0; //try to reduce the top of the content hiding for a second
                    opts.animate ? box.stop().animate({
                        height: newHeight
                    }, opts.speed) : box.innerHeight(newHeight);
                } else if (!e || e.which == 8 || e.which == 46 || (e.ctrlKey && e.which == 88)) { //user is deleting, backspacing, or cutting
                    if (oldHeight > minHeight) { //shrink!
                        //this cloning part is not particularly necessary. however, it helps with animation
                        //since the only way to cleanly calculate where to shrink the box to is to incrementally
                        //reduce the height of the box until the $.innerHeight() and the scrollHeight differ.
                        //doing this on an exact clone to figure out the height first and then applying it to the
                        //actual box makes it look cleaner to the user
                        clone = box.clone()
                            //add clone class for extra css rules
                            .addClass(opts.cloneClass)
                            //make "invisible", remove height restriction potentially imposed by existing CSS
                            .css({
                                position: 'absolute',
                                zIndex: -10,
                                height: ''
                            })
                            //populate with content for consistent measuring
                            .val(box.val());
                        box.after(clone); //append as close to the box as possible for best CSS matching for clone
                        do { //reduce height until they don't match
                            newHeight = clone[0].scrollHeight - 1;
                            clone.innerHeight(newHeight);
                        } while (newHeight === clone[0].scrollHeight);
                        newHeight++; //adding one back eliminates a wiggle on deletion 
                        clone.remove();
                        box.focus(); // Fix issue with Chrome losing focus from the textarea.

                        //if user selects all and deletes or holds down delete til beginning
                        //user could get here and shrink whole box
                        newHeight < minHeight && (newHeight = minHeight);
                        oldHeight > newHeight && opts.animate ? box.stop().animate({
                            height: newHeight
                        }, opts.speed) : box.innerHeight(newHeight);
                    } else { //just set to the minHeight
                        box.innerHeight(minHeight);
                    }
                }
            }
            return that;
        }
    })(jQuery);
    $('.form__textarea').autogrow({
        onInitialize: true
    });


    // // Fade out video poster frame and plays video on click

    if (document.getElementById("vimeo-video")) {
        console.log('#video exist on the page');
        var player = $("#vimeo-video");
        froogaloop = $f(player[0].id);

        $('.video__button--play').click(function(e) {
            $('.video__poster').fadeOut("slow");
            $('.hero__video__poster').fadeOut("slow");
            froogaloop.api('play');
        });
    } else {
        console.log('#video does not exist on the page');
    }

    // Simple-title clip path on load resize and scroll

    var simpleTitle = $('.simple-title'); //record the elem so you don't crawl the DOM everytime

    $(window).bind("load resize scroll", function(e) { // refresh on load and resize

        var height = simpleTitle.outerHeight(true); // find height of .simple-title

        var difference = (height - $(window).scrollTop());

        $(".simple-title__text-container").css({ "-webkit-clip-path": "polygon(0 0, 100% 0, 100% " + difference + "px, 0 " + difference + "px)" });

    });


    // Owl carousel configuration

    var isOwlCarousel = document.getElementsByClassName('owl-carousel');
    if (isOwlCarousel.length > 0) {
        console.log('.owl-carousel exists on the page');
        $(".owl-carousel").owlCarousel({
            margin: 10,
            loop: true,
            dots: true,
            nav: true,
            items: 1,
            navText: ["", ""],
            responsive: {
                0: {
                    margin: 16,
                    stagePadding: 32
                },
                768: {
                    margin: 32,
                    stagePadding: 64
                },
                992: {
                    margin: 32,
                    stagePadding: 64
                },
                1200: {
                    margin: 64,
                    stagePadding: 128
                },
                1600: {
                    margin: 128,
                    stagePadding: 256
                }
            }
        });
    } else {
        console.log('.owl-carousel does not exist on the page');
    }


    // Toggle class .visible .full-visible when in viewport


    $('.animate').viewportChecker({
        classToAdd: 'visible', // Class to add to the elements when they are visible,
        classToAddForFullView: 'full-visible', // Class to add when an item is completely visible in the viewport
        // classToRemove: 'invisible', // Class to remove before adding 'classToAdd' to the elements
        // removeClassAfterAnimation: false, // Remove added classes after animation has finished
        // offset: [100 OR 10 % ], // The offset of the elements (let them appear earlier or later). This can also be percentage based by adding a '%' at the end
        // invertBottomOffset: true, // Add the offset as a negative number to the element's bottom
        repeat: true, // Add the possibility to remove the class if the elements are not visible
        // callbackFunction: function(elem, action) {}, // Callback to do after a class was added to an element. Action will return "add" or "remove", depending if the class was added or removed
        // scrollHorizontal: false // Set to true if your website scrolls horizontal instead of vertical.
    });


    // Approach page - Bottom module (contact0=)

    $(window).scroll(function() {
        if ($(".solutions__contact").is(".visible")) {
            $("#solutions__shrink").addClass("shrink");
            $("#solutions__shrink--far").addClass("shrink");
        }
        if (!$(".solutions__contact").is(".visible")) {
            $("#solutions__shrink").removeClass("shrink");
            $("#solutions__shrink--far").removeClass("shrink");
        }
    });


    // Office-list Tab shifting between North America / Europe / Asia PAcific


    var x = $('.office-list__area:nth-child(1)').height();
    $('.office-list__area-container').css('height', x);

    $('#office-list__tab__north-america').click(function() {
        var x = $('.office-list__area:nth-child(1)').height();
        $('.office-list__area-container').css('height', x);
        $("#office-list__tab__europe").removeClass("active");
        $("#office-list__tab__asia-pacific").removeClass("active");
        $(this).addClass("active");
        $(".office-list").removeClass("europe asia-pacific").addClass("north-america");
    });
    $('#office-list__tab__europe').click(function() {
        var x = $('.office-list__area:nth-child(2)').height();
        $('.office-list__area-container').css('height', x);
        $("#office-list__tab__north-america").removeClass("active");
        $("#office-list__tab__asia-pacific").removeClass("active");
        $(this).addClass("active");
        $(".office-list").removeClass("north-america asia-pacific").addClass("europe");
    });
    $('#office-list__tab__asia-pacific').click(function() {
        var x = $('.office-list__area:nth-child(3)').height();
        $('.office-list__area-container').css('height', x);
        $("#office-list__tab__north-america").removeClass("active");
        $("#office-list__tab__europe").removeClass("active");
        $(this).addClass("active");
        $(".office-list").removeClass("north-america europe").addClass("asia-pacific");
    });

    $(window).bind("load resize", function(e) { // refresh on load and resize

        if ($(".office-list").hasClass("north-america")) {
            var x = $('.office-list__area:nth-child(1)').height();
            $('.office-list__area-container').css('height', x);
        }
        if ($(".office-list").hasClass("europe")) {
            var x = $('.office-list__area:nth-child(2)').height();
            $('.office-list__area-container').css('height', x);
        }
        if ($(".office-list").hasClass("asia-pacific")) {
            var x = $('.office-list__area:nth-child(3)').height();
            $('.office-list__area-container').css('height', x);
        }

    });

    $(".input-select").change(function() {
        if ($(".input-select option[value='none']").attr('select')) {
            $(".input-select").addClass("selected");
        }
    });

    // Google map embed on office-contact-info
    // When the window has finished loading create our google map below

    if (document.getElementById("map")) {

        google.maps.event.addDomListener(window, 'load', init);

        function init() {
            // Basic options for a simple Google Map
            // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
            var mapOptions = {
                // How zoomed in you want the map to start at (always required)
                zoom: 13,

                // The latitude and longitude to center the map (always required)
                center: new google.maps.LatLng(40.728531, -74.007424), // New York Office latitute and longitude

                // How you would like to style the map. 
                // This is where you would paste any style found on Snazzy Maps.
                styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }],

                // disable scroll wheel on map
                scrollwheel: false
            };

            // Get the HTML DOM element that will contain your map 
            // We are using a div with id="map" seen below in the <body>
            var mapElement = document.getElementById('map');

            // Create the Google Map using our element and options defined above
            var map = new google.maps.Map(mapElement, mapOptions);


            // SVG of the razorfish marker
            var icon = {

                    path: "M18.9162733,25.8449684 C15.45574,25.8449684 12.6500733,23.0376 12.6500733,19.5740211 C12.6500733,16.1104421 15.45574,13.3030737 18.9162733,13.3030737 C22.3768067,13.3030737 25.1824733,16.1104421 25.1824733,19.5740211 C25.1824733,23.0376 22.3768067,25.8449684 18.9162733,25.8449684 M17.76044,0.0342315789 C8.30287333,0.5976 0.60344,8.30475789 0.0347066667,17.7696 C-0.174293333,21.2552842 0.56544,24.5483368 2.01134,27.4245474 C2.01260667,27.4277053 2.01260667,27.4302316 2.01387333,27.4327579 C4.24574,33.4245474 14.6970067,53.1487579 17.94854,59.2403368 C18.3621067,60.0159158 19.47044,60.0159158 19.88464,59.2403368 C23.1361733,53.1487579 33.58744,33.4245474 35.8193067,27.4327579 C35.81994,27.4302316 35.81994,27.4277053 35.8212067,27.4245474 C37.1049733,24.8704421 37.8326733,21.9866526 37.8326733,18.9317053 C37.8326733,8.09317895 28.7316733,-0.618189474 17.76044,0.0342315789",
                    fillColor: '#a9c000',
                    fillOpacity: 1,
                    anchor: new google.maps.Point(0, 0),
                    strokeWeight: 0,
                    scale: 1
                }
                // Let's also add a marker while we're at it
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(40.728531, -74.007424),
                map: map,
                title: 'Snazzy!',
                icon: icon
            });
        }
    }


    // Disable zoom when user uses select

    $('select').mousedown(function() {
        $('meta[name=viewport]').remove();
        $('head').append('<meta name="viewport" content="width=device-width, maximum-scale=1.0, user-scalable=0">');
    })

    $('select').focusout(function() {
        $('meta[name=viewport]').remove();
        $('head').append('<meta name="viewport" content="width=device-width, initial-scale=yes">');
    })


    // Make share button position:fixed on case study pages
    var isSocialShareFolded = document.getElementsByClassName('social-share--folded__footer');
    if (isSocialShareFolded.length > 0) {

        $(window).bind("load resize scroll", function(e) { // refresh on load, resize and scroll

            if (($('.social-share--folded__footer')[0].getBoundingClientRect().bottom <= window.innerHeight) && ($('.social-share--folded__footer').parent()[0].getBoundingClientRect().top <= $('.social-share--folded__footer')[0].getBoundingClientRect().top)) {
                $('.social-share--folded__footer').addClass("fixed");
            } else {
                $('.social-share--folded__footer').removeClass("fixed");
            };

            if ($('.social-share--folded__footer').parent()[0].getBoundingClientRect().bottom <= window.innerHeight) {
                $('.social-share--folded__footer').addClass("bottom");
            } else {
                $('.social-share--folded__footer').removeClass("bottom");
            }
        });
    }


    // Approach page snappy scroll

    // if (document.getElementById("fullpage")) {
    //     $('#fullpage').fullpage({
    //         scrollBar: true,
    //         // menu: '#solutions__menu',
    //         verticalCentered: false,
    //         scrollingSpeed: 500,
    //         autoScrolling: true,
    //         fitToSectionDelay: 2000,
    //         touchSensitivity: 10,
    //         // onLeave: function(giovanni) { // Change navigation to position fixed when I'm viewing slide 5
    //         //     console.log("sliding");
    //         //     if ($('body').hasClass("fp-viewing-slide5")) {
    //         //         setTimeout(function() {
    //         //             $(".solutions__menu").addClass("fixed");
    //         //             console.log("fixed");
    //         //         }, 500);
    //         //     } else {
    //         //         $(".solutions__menu").removeClass("fixed");
    //         //         console.log("remove fixed");
    //         //     }

    //         // }
    //     });
    // }

    // apply gradient map




    // Code used to generate Gradient Map

    // var target = document.getElementById('myimage');
    // var gradientMap = "#242926, #42585c";

    // GradientMaps.applyGradientMap(target, gradientMap);


    // Navigation opacity

    // $(window).scroll(function() {
    //     if (($(this).scrollTop() >= window.innerHeight) && (!$("body").hasClass("approach"))) { // If browser scrolled more then viewport then add white background to navigation, only if body does not have class approach
    //         $(".site-masthead").addClass("opaque");
    //     } else {
    //         $(".site-masthead").removeClass("opaque");
    //     }
    // });

    // Vanilla JS version

    var siteMasthead = document.querySelector('.site-masthead');

    function siteMastheadTransparencyCheck() {
        var rect = siteMasthead.getBoundingClientRect();
        if (document.body.scrollTop >= window.innerHeight) {
            siteMasthead.classList.add('opaque');
        } else {
            siteMasthead.classList.remove('opaque');
        }
    };

    window.addEventListener('resize', siteMastheadTransparencyCheck);
    window.addEventListener('scroll', siteMastheadTransparencyCheck);
    window.addEventListener('load', siteMastheadTransparencyCheck);



    // Footer: navigation hides when footer is in viewport

    if (document.querySelector('.footer')) {
        var footer = document.querySelector('.footer');
        var siteMasthead = document.querySelector('.site-masthead');

        function footerInViewport() {
            var rect = footer.getBoundingClientRect();
            if (rect.top <= window.innerHeight) {
                console.log("footer in viewport");
                siteMasthead.classList.add('important-hiding');
            } else {
                siteMasthead.classList.remove('important-hiding');
            }
        };

        // Bind it on scroll, load and resize.
        window.addEventListener('resize', footerInViewport);
        window.addEventListener('scroll', footerInViewport);
        window.addEventListener('load', footerInViewport);

    }




    // Navigation: on open give random delay to each link

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }



    $("#site-masthead__checkbox").click(function() {

        if ($(this).is(':checked')) {
            $(".site-navigation__overlay").addClass("visible");
            setTimeout(function() {
                $(".site-navigation__overlay").addClass("open");
            }, 10);
            $('.site-navigation__link-container').each(function() {
                $(this).css({ 'transition-delay': getRandomInt(1, 10) * 0.025 + 0.1 + "s" });

            });
            console.log("open navigation");

        } else {
            console.log("close navigation");
            $(".site-navigation__overlay").removeClass("open");
            setTimeout(function() {
                $(".site-navigation__overlay").removeClass("visible");
            }, 210);
        }

    });


    // Feed: animation on fade in

    if (document.querySelectorAll('.feed__item')) {

        var feedItem = document.querySelectorAll('.feed__item');

        // Feed: counts number of .feed__item and assign a progressive delay for each
        for (var i = 0; i < feedItem.length; ++i) {
            var item = feedItem[i];
            item.style.animationDelay = i * 0.05 + 0.2 + "s";
        }

        // If .feed__item is below the viewport add class .away and remove class .fly-in
        function feedItemInViewport() {
            [].forEach.call(feedItem, function(div) {
                var rect = div.getBoundingClientRect();
                div.classList.add('away');
                if ((rect.top >= (window.innerHeight / 8 * -1)) && (rect.top <= window.innerHeight)) {
                    console.log("adding class");
                    div.classList.add('fly-in');
                } else if (rect.top > window.innerHeight) {
                    div.classList.remove("fly-in");
                }
            });
        };

        // Bind it on scroll, load and resize.
        window.addEventListener('resize', feedItemInViewport);
        window.addEventListener('scroll', feedItemInViewport);
        window.addEventListener('load', feedItemInViewport);

    }


    // Hero: animations

    if (document.querySelector('.hero')) {


        // Hero:first-of-type: if scrolled more then 1/6 of viewport it hides the bouncy arrow


        var heroFirstOfType = document.querySelector('.hero');
        document.addEventListener(
            'scroll',
            function(event) {
                var heroTop = heroFirstOfType.getBoundingClientRect().top;
                if ((heroTop >= (window.innerHeight / 6 * -1)) && (heroTop <= window.innerHeight)) {
                    // console.log("half in viewport");
                    heroFirstOfType.classList.remove('hide-arrow');
                } else {
                    // console.log("half not in viewport");
                    heroFirstOfType.classList.add('hide-arrow');
                }
            },
            true // Capture event
        );


        var hero = document.querySelectorAll('.hero');

        // If .hero is not in the viewport add class .away and remove class .fly-in
        function heroInViewport() {
            [].forEach.call(hero, function(div) {
                var rect = div.getBoundingClientRect();
                div.classList.add('away');
                // If the hero is out of viewport, remove class .fly-in
                if ((rect.top > window.innerHeight) || (rect.top < (window.innerHeight * -1))) {
                    div.classList.remove("fly-in");
                } else {
                    div.classList.add('fly-in');
                }
            });
        };

        // Bind it on scroll, load and resize.
        window.addEventListener('resize', heroInViewport);
        window.addEventListener('scroll', heroInViewport);
        window.addEventListener('load', heroInViewport);



        // Hero text container animation

        var heroTextContainer = document.querySelectorAll('.hero__text-container');

        // If .hero__text-container is below the viewport add class .away and remove class .fly-in
        function heroTextContainerInViewport() {
            [].forEach.call(heroTextContainer, function(div) {
                var rect = div.getBoundingClientRect();
                // If .hero__text-container is past half of the viewport then...
                if (rect.top <= (window.innerHeight)) {
                    div.classList.add('fly-in');
                } else if (rect.top > window.innerHeight) {
                    div.classList.add('away');
                    div.classList.remove("fly-in");
                }
            });
        };

        // Bind it on scroll, load and resize.
        window.addEventListener('resize', heroTextContainerInViewport);
        window.addEventListener('scroll', heroTextContainerInViewport);
        window.addEventListener('load', heroTextContainerInViewport);



    }


    // Divider: animations

    if (document.querySelectorAll('.divider')) {

        var divider = document.querySelectorAll('.divider');


        function dividerInViewport() {
            [].forEach.call(divider, function(div) {
                var rect = div.getBoundingClientRect();

                // Add class .not-in-viewport to all .divider on the page
                div.classList.add('not-in-viewport');

                // If .divider is not of viewport, remove class .in-viewport
                if ((rect.top > window.innerHeight) || (rect.top < (window.innerHeight * -1))) {
                    div.classList.remove("in-viewport");
                } else {
                    div.classList.add('in-viewport');
                }
            });
        };

        // Bind it on scroll, load and resize.
        window.addEventListener('resize', dividerInViewport);
        window.addEventListener('scroll', dividerInViewport);
        window.addEventListener('load', dividerInViewport);

    }


    // solutions__card:first-of-type: if scrolled more then 1/6 of viewport it hides the bouncy arrow

    if (document.querySelector('.solutions__card')) {
        var solutionsCard = document.querySelector('.solutions__card');
        document.addEventListener(
            'scroll',
            function(event) {
                var solutionsCardTop = solutionsCard.getBoundingClientRect().top;
                if ((solutionsCardTop >= (window.innerHeight / 6 * -1)) && (solutionsCardTop <= window.innerHeight)) {
                    solutionsCard.classList.remove('hide-arrow');
                } else {
                    solutionsCard.classList.add('hide-arrow');
                }
            },
            true // Capture event
        );
    }





    // Make selected option in Select uppercase

    // $(".select").each(function() {
    //     $(this).change(function() {
    //         $(this).find("option").text(function(i, text) {
    //             return $(this).is(":selected") ? text.toUpperCase() : text.toLowerCase()
    //         });
    //     }).trigger("change");
    // });

    //Function to capitalise first character for strings

    // On load change already selected option to uppercase
    $('.select').each(function() {
        $(this).children(':selected').text($(this).children(':selected').text().toUpperCase());
    });

    // On select change selected option to uppercase, not selected to lowercase
    $('.select').change(function() {
        $(this).children(':selected').text($(this).children(':selected').text().toUpperCase());

        $(this).children(':not(:selected)').each(function() {
            $(this).text($(this).text().toLowerCase());

        });

    });

    // Approach page

    if (document.querySelector('.solutions')) {
        var pillar1 = document.getElementById('solutions__pillar1');
        var pillar2 = document.getElementById('solutions__pillar2');
        var pillar3 = document.getElementById('solutions__pillar3');
        var pillar4 = document.getElementById('solutions__pillar4');
        var pillar5 = document.getElementById('solutions__pillar5');
        var solutionsMenu = document.getElementById('solutions__menu');
        var practices = document.getElementById('solutions__practices');
        var solutionsFooter = document.getElementById('solutions__footer');

        $(window).bind("load resize scroll", function(e) { // refresh on load and resize

            // Show  solutions__menu when pillar1 comes in viewport

            var distanceToTop = pillar1.getBoundingClientRect().top;
            if (distanceToTop <= (window.innerHeight / 2)) {
                $("#solutions__menu").removeClass("hide");
            } else {
                $("#solutions__menu").addClass("hide");
            }


            // If solutions__footer is in viewport, menu is position absolute, add class .hide

            var distanceLinkFromTop = solutionsFooter.getBoundingClientRect().top;
            if (distanceLinkFromTop <= (window.innerHeight)) {
                $("#solutions__menu").addClass("absolute");
                $("#solutions__menu").addClass("hide-bottom");
            } else {
                $("#solutions__menu").removeClass("absolute");
                $("#solutions__menu").removeClass("hide-bottom");
            }

            // If solutions__footer is in viewport, shrink page above

            var distanceFooterFromTop = solutionsFooter.getBoundingClientRect().top;
            if (distanceFooterFromTop <= (window.innerHeight)) {
                $(".solutions__shrinking-area").addClass("shrink");
            } else {
                $(".solutions__shrinking-area").removeClass("shrink");
            }

            // Check which pillar is in viewport and activate navigation link

            var pillar1inViewport = pillar1.getBoundingClientRect().top;
            console.log(pillar1inViewport);
            if (pillar1inViewport <= (window.innerHeight / 2) && (pillar1inViewport > (window.innerHeight * -1 / 2))) {
                $('[data-menuanchor="pillar1"]').addClass("active");
            } else {
                $('[data-menuanchor="pillar1"]').removeClass("active");
            }

            var pillar2inViewport = pillar2.getBoundingClientRect().top;
            if (pillar2inViewport <= (window.innerHeight / 2) && (pillar2inViewport > (window.innerHeight * -1 / 2))) {
                $('[data-menuanchor="pillar2"]').addClass("active");
            } else {
                $('[data-menuanchor="pillar2"]').removeClass("active");
            }

            var pillar3inViewport = pillar3.getBoundingClientRect().top;
            if (pillar3inViewport <= (window.innerHeight / 2) && (pillar3inViewport > (window.innerHeight * -1 / 2))) {
                $('[data-menuanchor="pillar3"]').addClass("active");
            } else {
                $('[data-menuanchor="pillar3"]').removeClass("active");
            }

            var pillar4inViewport = pillar4.getBoundingClientRect().top;
            if (pillar4inViewport <= (window.innerHeight / 2) && (pillar4inViewport > (window.innerHeight * -1 / 2))) {
                $('[data-menuanchor="pillar4"]').addClass("active");
            } else {
                $('[data-menuanchor="pillar4"]').removeClass("active");
            }

            var pillar5inViewport = pillar5.getBoundingClientRect().top;
            if (pillar5inViewport <= (window.innerHeight / 2) && (pillar5inViewport > (window.innerHeight * -1 / 2))) {
                $('[data-menuanchor="pillar5"]').addClass("active");
            } else {
                $('[data-menuanchor="pillar5"]').removeClass("active");
            }

            var practicesInViewport = practices.getBoundingClientRect().top;
            if (practicesInViewport <= (window.innerHeight / 2) && (practicesInViewport > (window.innerHeight * -1 / 2))) {
                $('[data-menuanchor="practices"]').addClass("active");
            } else {
                $('[data-menuanchor="practices"]').removeClass("active");
            }



        });

    };




});
