// This is the jQuery I am using on the various pages

window.onload = (function() {

    console.log('javascript file loaded');

    // On page load remove fade class

    if (document.getElementsByClassName('body-wrapper')[0]) {

        var bodyWrapper = document.getElementsByClassName('body-wrapper')[0];
        var masthead = document.getElementsByClassName('masthead')[0];
        var siteNavigationOverlay = document.getElementsByClassName('scroll')[0];

        setTimeout(function() {
            bodyWrapper.classList.remove('fade');
            masthead.classList.remove('fade');

            // if on load the page is scrolled more then window height, start with the navigation hidden
            if (document.body.scrollTop >= window.innerHeight) {
                masthead.classList.add('hiding');
            } else {
                masthead.classList.remove('fade');
            }

        }, 10);

        // Intercept links away from page

        function interceptClickEvent(e) {
            var href;
            var target = e.target || e.srcElement;
            if ((target.tagName === 'A') && (target.href != "")) { // Check that href is not empty (like in the case of tabs)
                href = target.getAttribute('href');

                if (true) {
                    bodyWrapper.classList.add('fade');
                    masthead.classList.add('fade');
                    siteNavigationOverlay.classList.add('fade');
                    //tell the browser not to respond to the link click
                    e.preventDefault();
                    // navigate to the link after the transion has ended
                    bodyWrapper.addEventListener("transitionend", function(e) { window.location.href = href; });
                }
            }
        }


        //listen for link click events at the document level
        if (document.addEventListener) {
            document.addEventListener('click', interceptClickEvent);
        } else if (document.attachEvent) {
            document.attachEvent('onclick', interceptClickEvent);
        }


    }



    var masthead = document.getElementsByClassName('masthead')[0];
    var mastheadCheckbox = document.getElementById('masthead__checkbox');
    var siteNavigationOverlay = document.getElementsByClassName('site-navigation')[0];
    var siteNavigationLinkContainers = document.getElementsByClassName('link-container');

    // Navigation: add .active class to link of current page

    var siteNavigatioContainer = document.getElementsByClassName('container')[0],
        anchor = siteNavigatioContainer.getElementsByClassName('link--underline'),
        current = window.location.pathname.split('/')[1];

    for (var i = 0; i < anchor.length; i++) {
        var pieces = anchor[i].href.split("/"); // Split the href by "/"
        var lastPiece = pieces[pieces.length - 1]; // Take the last of the splitted parts
        if (lastPiece == current) { // If it matchets current url
            anchor[i].classList.add("active"); // then add class active
        }
    }


    // Function to get random numbers to use for delay in navigation links
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    mastheadCheckbox.onclick = function() {

        // If navigation checkbox is checked
        if (this.checked) {

            // Toggle scroll from body and html so that the rest of the page doesn't scroll
            document.body.style.overflowY = "hidden";
            document.documentElement.style.overflowY = "hidden";

            // Navigation: on open give random delay to each link
            siteNavigationOverlay.classList.add('visible');

            masthead.style.color = "rgb(74, 66, 66)"; // Make masthead black since navigation has black text
            // masthead.classList.add('navigation-open'); // So that if the navigation has white text (ex: solution landing page), the razorfish logo and hamburger are still black
            setTimeout(function() {
                siteNavigationOverlay.classList.add('open');
            }, 10);

            // For each .link-container add a random transition-delay number
            for (var i = 0; i < siteNavigationLinkContainers.length; i++) {
                //do something to each div like
                siteNavigationLinkContainers[i].style.transitionDelay = getRandomInt(1, 10) * 0.025 + 0.1 + "s";
            }


        } else {

            // Bring back scroll to body and html
            document.body.style.overflowY = "auto";
            document.documentElement.style.overflowY = "auto";

            // Remove class open and visible from all links into navigation

            siteNavigationOverlay.classList.remove('open');

            // masthead.classList.remove('navigation-open');
            setTimeout(function() {
                siteNavigationOverlay.classList.remove('visible');
                moduleBehindNav(); // to check which font color is the module behind the navigation
            }, 210);
        }

    };


    // Button Submit Form Animation

    if (document.getElementsByClassName('button__submit-form')[0]) {

        buttonSubmitForm = document.getElementsByClassName('button__submit-form')[0];

        // Button Animation

        buttonSubmitForm.onclick = function() {

            if (!buttonSubmitForm.classList.contains("anim-1")) {

                buttonSubmitForm.classList.add("anim-1");

                anim2 = function(event) {
                    if (event.animationName === "anim_1") {
                        buttonSubmitForm.classList.add("anim-2");
                    }
                }

                anim3 = function(event) {
                    if (event.animationName === "anim_2") {
                        buttonSubmitForm.classList.add("anim-3");
                    }
                }

                anim4 = function(event) {
                    if (event.animationName === "anim_3") {
                        buttonSubmitForm.classList.add("anim-4");
                    }
                }

                buttonSubmitForm.addEventListener("animationend", anim2);
                buttonSubmitForm.addEventListener("animationend", anim3);
                buttonSubmitForm.addEventListener("animationend", anim4);

                setTimeout(function() {
                    contactFormOverlay.classList.remove("form");
                    contactFormOverlay.classList.add("confirmation");
                }, 8000);

                setTimeout(function() {
                    contactFormOverlay.classList.remove("confirmation");
                }, 12000);

                setTimeout(function() {
                    contactFormDisplayOff();
                    buttonSubmitForm.classList.remove("anim-1", "anim-2", "anim-3", "anim-4");

                    buttonSubmitForm.removeEventListener("animationend", anim2);
                    buttonSubmitForm.removeEventListener("animationend", anim3);
                    buttonSubmitForm.removeEventListener("animationend", anim4);
                }, 12500);


            } else {
                buttonSubmitForm.classList.remove("anim-1", "anim-2", "anim-3", "anim-4");

                buttonSubmitForm.removeEventListener("animationend", anim2);
                buttonSubmitForm.removeEventListener("animationend", anim3);
                buttonSubmitForm.removeEventListener("animationend", anim4);
            }
        }

    }

    // Contact-form, toggling classes when overlay is open

    if (document.getElementById('contact-form__hero')) {

        contactFormLink = document.getElementsByClassName('contact-form__link');
        contactFormOverlay = document.getElementsByClassName('contact-form__overlay')[0];
        contactFormFormGroup = document.getElementsByClassName('contact-form__form-group')[0];
        contactFormHero = document.getElementById('contact-form__hero');
        contactFormSubmitButton = document.getElementsByClassName('form__submit-button')[0];
        contactFormConfirmationGroup = document.getElementsByClassName('contact-form__confirmation-group')[0];
        contactFormBack = document.getElementsByClassName('contact-form__back')[0];
        contactFormBackContainer = document.getElementsByClassName('contact-form__back-container')[0];
        contactFormBackgroundImage = document.querySelector('.image svg');
        contactFormBackgroundImageBlur = document.querySelector('.image svg feGaussianBlur');

        function contactFormDisplayOn() {
            contactFormOverlay.classList.add("display");
            document.body.style.overflowY = "hidden";
            document.documentElement.style.overflowY = "hidden";
        }

        function contactFormDisplayOff() {
            contactFormOverlay.classList.remove("display");
            document.body.style.overflowY = "auto";
            document.documentElement.style.overflowY = "auto";
        }

        for (var i = 0; i < contactFormLink.length; i++) {
            contactFormLink[i].onclick = function() {

                // Scroll body so that #contact-form__hero fits fully into view
                $('html, body').animate({
                    scrollTop: $('#contact-form__hero').offset().top
                }, 400);

                contactFormDisplayOn();

                setTimeout(function() {
                    contactFormOverlay.classList.add("form");
                }, 405);
            }
        }

        // On click on Back button remove overlay
        contactFormBack.onclick = function() {
            contactFormOverlay.classList.remove("form");
            setTimeout(function() {
                contactFormDisplayOff();
            }, 1000);
        }

    }



    // Demo Form Submit Button Animation

    if (document.getElementsByClassName('demo_loop')[0]) {

        var formSubmitButtonDemo = document.getElementsByClassName('demo_loop')[0];

        console.log("yes");

        function formSubmitButtonDemoLoop() {
            console.log("fire");
            setTimeout(function() {
                formSubmitButtonDemo.classList.add("shrink");
                console.log("1000 shrinking");
            }, 2000);
            setTimeout(function() {
                formSubmitButtonDemo.classList.add("load");
                console.log("2000 loading");
            }, 3000);
            setTimeout(function() {
                formSubmitButtonDemo.classList.add("fill");
                console.log("3000 filling");
            }, 6000);
            setTimeout(function() {
                formSubmitButtonDemo.classList.add("tick");
                console.log("4000 tick");
            }, 7000);
            setTimeout(function() {
                formSubmitButtonDemo.classList.add("destroy");
                console.log("5000 destroy");
            }, 10000);
            setTimeout(function() {
                formSubmitButtonDemo.classList.remove("shrink", "load", "fill", "tick", "destroy");
                console.log("6000 remove classes");
            }, 12000);

        }

        formSubmitButtonDemoLoop(); // Fire function a first time

        window.setInterval(formSubmitButtonDemoLoop, 14000); // repeat function every 9 seconds
    };





    // Form: if in select.form-select an option is selected, add class .selected
    $(".form-select").each(function() {
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









    // Check if .form-textarea is empty. If so add class not-empty, so that the placeholder label can move above text-area

    $('.form-textarea').change(function() {
        if ($.trim($(this).val()).length < 1) {
            $(this).removeClass("filled");
        } else {
            $(this).addClass("filled");
        }
    });

    if ($.trim($(".form-textarea").val())) {
        // textarea is not empty or doesn't contains only white-space
        $(this).addClass("not-empty");
    }


    // This script shows the name of the file selected into attachment, or the number of files selected 
    'use strict';;
    (function($, window, document, undefined) {
        $('.form__file').each(function() {
            var $input = $(this),
                $label = $(".form-attachment--attachment"),
                labelVal = $label.html();

            $input.on('change', function(e) {
                var fileName = '';

                if (this.files && this.files.length > 1) {
                    fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
                    $('.form-attachment').addClass("active");
                } else if (e.target.value) {
                    fileName = e.target.value.split('\\').pop();
                    $('.form-attachment').removeClass("active");
                }


                if (fileName) {
                    $label.find('span').html(fileName);
                    $('.form-attachment').addClass("active");
                } else {
                    $label.html(labelVal);
                    $('.form-attachment').removeClass("active");
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
    $('.form-textarea').autogrow({
        onInitialize: true
    });


    // Fade out video poster frame and plays video on click

    if (document.getElementById("vimeo-video")) {
        // console.log('#video exist on the page');
        var player = $("#vimeo-video");
        froogaloop = $f(player[0].id);

        $('.video__button--play').click(function(e) {
            $('.poster').fadeOut("slow");
            $('.hero__poster').fadeOut("slow");
            froogaloop.api('play');
        });
    }



    // Simple-title clip path on load resize and scroll

    if (document.getElementsByClassName("simple-title")[0]) {

        var simpleTitle = document.getElementsByClassName("simple-title")[0];
        var simpleTitleTextContainer = document.getElementsByClassName("module-content")[0];

        function simpleTitleClipPath() {

            var height = simpleTitle.clientHeight; // find height of .simple-title

            var difference = (height + simpleTitle.getBoundingClientRect().top); // get difference between height and how much it has scrolled away

            simpleTitleTextContainer.style["-webkit-clip-path"] = "polygon(0 0, 100% 0, 100% " + difference + "px, 0 " + difference + "px)";

        };

        // Bind it on scroll, load and resize.
        window.addEventListener('resize', simpleTitleClipPath);
        window.addEventListener('scroll', simpleTitleClipPath);
        simpleTitleClipPath();
    }




    // Owl carousel configuration


    if (document.getElementsByClassName('owl-carousel')[0]) {
        var isOwlCarousel = document.getElementsByClassName('owl-carousel')[0];
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
    }


    // Solutions page - Bottom module (contact)

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

    if (document.getElementsByClassName('office-list')[0]) {

        var officeList = document.getElementsByClassName('office-list')[0];
        var officeListTabNorthAmerica = document.getElementById('tab__north-america');
        var officeListTabEurope = document.getElementById('tab__europe');
        var officeListTabAsiaPacific = document.getElementById('tab__asia-pacific');

        officeListTabNorthAmerica.onclick = function() {
            officeList.classList.add("north-america");
            officeList.classList.remove("europe", "asia-pacific");
            officeListTabNorthAmerica.classList.add("active");
            officeListTabEurope.classList.remove("active");
            officeListTabAsiaPacific.classList.remove("active");
        }

        officeListTabEurope.onclick = function() {
            officeList.classList.add("europe");
            officeList.classList.remove("north-america", "asia-pacific");
            officeListTabNorthAmerica.classList.remove("active");
            officeListTabEurope.classList.add("active");
            officeListTabAsiaPacific.classList.remove("active");
        }

        officeListTabAsiaPacific.onclick = function() {
            officeList.classList.add("asia-pacific");
            officeList.classList.remove("north-america", "europe");
            officeListTabNorthAmerica.classList.remove("active");
            officeListTabEurope.classList.remove("active");
            officeListTabAsiaPacific.classList.add("active");
        }

    }

    $(".input-select").change(function() {
        if ($(".input-select option[value='none']").attr('select')) {
            $(".input-select").addClass("selected");
        }
    });





    // Disable zoom when user uses select

    $('select').mousedown(function() {
        $('meta[name=viewport]').remove();
        $('head').append('<meta name="viewport" content="width=device-width, maximum-scale=1.0, user-scalable=0">');
    })

    $('select').focusout(function() {
        $('meta[name=viewport]').remove();
        $('head').append('<meta name="viewport" content="width=device-width, initial-scale=yes">');
    })


    // Make share button position:fixed on case study page
    if (document.getElementsByClassName('social-share--folded__footer')[0]) {

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



    // Code used to generate Gradient Map

    // var target = document.getElementById('myimage');
    // var gradientMap = "#242926, #42585c";

    // GradientMaps.applyGradientMap(target, gradientMap);




    // Change masthead color depending on color of elements below it. 

    if (masthead = document.getElementsByClassName('masthead')[0]) {

        // Collect all big elements
        var masthead = document.getElementsByClassName('masthead')[0];
        var mastheadLogo = document.querySelector('.masthead .logo');

        var elements = document.querySelectorAll('section,.related-promo,.hero,.pull-quote,.site-navigation');

        // If .module is behind navigation get color of text
        function moduleBehindNav() {
            var mastheadRect = mastheadLogo.getBoundingClientRect();
            [].forEach.call(elements, function(div) {
                var elementRect = div.getBoundingClientRect();
                if ((elementRect.top <= mastheadRect.top) && (elementRect.bottom >= mastheadRect.bottom)) {
                    var getTheColor = window.getComputedStyle(div, null).getPropertyValue("color");
                    // console.log(getTheColor);
                    if (getTheColor == "rgb(255, 255, 255)") {
                        masthead.style.color = "rgb(255, 255, 255)";
                        // console.log("bingo");
                    } else {
                        masthead.style.color = "rgb(74, 66, 66)";
                    }

                }
            });
        };

        // Bind it on scroll, load and resize.
        window.addEventListener('resize', moduleBehindNav);
        window.addEventListener('scroll', moduleBehindNav);
        moduleBehindNav();

    }



    // // Navigation opacity

    // function mastheadTransparencyCheck() {
    //     var rect = masthead.getBoundingClientRect();
    //     if (document.body.scrollTop >= window.innerHeight) {
    //         masthead.classList.add('opaque');
    //     } else {
    //         masthead.classList.remove('opaque');
    //     }
    // };

    // window.addEventListener('resize', mastheadTransparencyCheck);
    // window.addEventListener('scroll', mastheadTransparencyCheck);
    // mastheadTransparencyCheck();



    // Feed old animation ro remove

    // Feed: animation on fade in

    if (document.getElementsByClassName('feed__item')) {

        var feedItem = document.getElementsByClassName('feed__item');

        // Feed: counts number of .feed__item and assign a progressive delay for each
        // for (var i = 0; i < feedItem.length; ++i) {
        //     var item = feedItem[i];
        //     item.style.animationDelay = i * 0.05 + 0.2 + "s";
        // }


        // Toggle classes if in viewport or not
        function feedItemInViewport() {
            [].forEach.call(feedItem, function(div) {
                var rect = div.getBoundingClientRect();
                if (rect.bottom < 0) {
                    div.classList.add('above-the-fold');
                    div.classList.remove('below-viewport');
                    div.classList.remove('in-viewport');
                } else if (rect.top > window.innerHeight) {
                    div.classList.add('below-viewport');
                    div.classList.remove('above-the-fold');
                    div.classList.remove('in-viewport');
                } else {
                    div.classList.add('in-viewport');
                    div.classList.remove('above-the-fold');
                    div.classList.remove('below-viewport');
                }
            });
        };

        // Bind it on scroll, load and resize.
        window.addEventListener('resize', feedItemInViewport);
        window.addEventListener('scroll', feedItemInViewport);
        feedItemInViewport();

    }

    // Module content vieport checker

    if (document.getElementsByClassName('module-content')[0]) {

        // .module-content toggle visibility classes
        var moduleContent = document.getElementsByClassName('module-content');

        // If .module-content is not in the viewport add class .below-viewport or .above-the-fold
        function moduleContentInViewport() {
            [].forEach.call(moduleContent, function(div) {
                var rect = div.getBoundingClientRect();
                if (rect.bottom < 0) {
                    div.classList.add('above-the-fold');
                    div.classList.remove('below-viewport');
                    div.classList.remove('in-viewport');
                } else if (rect.top > window.innerHeight) {
                    div.classList.add('below-viewport');
                    div.classList.remove('above-the-fold');
                    div.classList.remove('in-viewport');
                } else {
                    div.classList.add('in-viewport');
                    div.classList.remove('above-the-fold');
                    div.classList.remove('below-viewport');
                }
            });
        };

        // Bind it on scroll, load and resize.
        window.addEventListener('resize', moduleContentInViewport);
        window.addEventListener('scroll', moduleContentInViewport);
        moduleContentInViewport();

    }


    // Hero Carousel

    if (document.getElementsByClassName('hero__carousel')[0]) {

        var heroCarouselNav = document.getElementsByClassName('hero__carousel_nav')[0];

        // Count the number of hero in the page
        var hero = document.getElementsByClassName('hero');
        var heroCount = hero.length;

        // Add # span as many hero on the page
        var span = document.createElement("span");

        [].forEach.call(hero, function(div) {
            heroCarouselNav.appendChild(span);
            console.log("bla");
        });


        function heroCarouselInViewport() {

            // If heroCarousel is over some heroes, then make it visible
            if ((hero[0].getBoundingClientRect().top <= heroCarouselNav.getBoundingClientRect().top) && (hero[heroCount - 1].getBoundingClientRect().bottom >= heroCarouselNav.getBoundingClientRect().bottom)) {
                heroCarouselNav.classList.add('visible');
            } else {
                heroCarouselNav.classList.remove('visible');
            }
        }

        // which hero is in viewport?
        function heroInViewport() {
            [].forEach.call(hero, function(div) {
                var rect = div.getBoundingClientRect();
                if (rect.bottom < 0) {
                    div.classList.add('above-the-fold');
                    div.classList.remove('below-viewport');
                    div.classList.remove('in-viewport');
                } else if (rect.top > window.innerHeight) {
                    div.classList.add('below-viewport');
                    div.classList.remove('above-the-fold');
                    div.classList.remove('in-viewport');
                } else {
                    div.classList.add('in-viewport');
                    div.classList.remove('above-the-fold');
                    div.classList.remove('below-viewport');
                }
            });
        };


        window.addEventListener('resize', heroInViewport);
        window.addEventListener('scroll', heroInViewport);
        heroInViewport();
    }


    // Hero: animations

    if (document.getElementsByClassName('hero')[0]) {


        // Hero:first-of-type: if scrolled more then 1/6 of viewport it hides the bouncy arrow


        var heroFirstOfType = document.getElementsByClassName('hero')[0];
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


    }


    // Divider: animations

    if (document.getElementsByClassName('divider')) {

        var divider = document.getElementsByClassName('divider');


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
        dividerInViewport();

    }


    // solutions__card:first-of-type: if scrolled more then 1/6 of viewport it hides the bouncy arrow

    if (document.getElementsByClassName('solutions__card')[0]) {
        var solutionsCard = document.getElementsByClassName('solutions__card')[0];
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

    //Function to capitalise first character for strings

    // On load change already selected option to uppercase
    $('.select,.select_secondary').each(function() {
        $(this).children('.group').children(':selected').text($(this).children('.group').children(':selected').text().toUpperCase());
    });

    // On select change selected option to uppercase, not selected to lowercase
    $('.select,.select_secondary').change(function() {
        $(this).children('.group').children(':selected').text($(this).children('.group').children(':selected').text().toUpperCase());

        $(this).children('.group').children(':not(:selected)').each(function() {
            $(this).text($(this).text().toLowerCase());

        });

    });

    // Solutions page

    if (document.getElementsByClassName('solutions')[0]) {
        var pillar1 = document.getElementById('pillar1');
        var pillar2 = document.getElementById('pillar2');
        var pillar3 = document.getElementById('pillar3');
        var pillar4 = document.getElementById('pillar4');
        var pillar5 = document.getElementById('pillar5');
        var pillar6 = document.getElementById('pillar6');
        var practices = document.getElementById('practices');
        var solutionsMenu = document.getElementById('solutions__menu');
        var solutionsFooter = document.getElementById('solutions__footer');
        var solutionMenuLink1 = document.querySelector("#solutions__menu .menu-link:nth-child(1)");
        var solutionMenuLink2 = document.querySelector("#solutions__menu .menu-link:nth-child(2)");
        var solutionMenuLink3 = document.querySelector("#solutions__menu .menu-link:nth-child(3)");
        var solutionMenuLink4 = document.querySelector("#solutions__menu .menu-link:nth-child(4)");
        var solutionMenuLink5 = document.querySelector("#solutions__menu .menu-link:nth-child(5)");
        var solutionMenuLink6 = document.querySelector("#solutions__menu .menu-link:nth-child(6)");
        var solutionMenuLink7 = document.querySelector("#solutions__menu .menu-link:nth-child(7)");


        function solutionMenuLinks() {

            if (document.querySelector("#pillar1 .module-content").classList.contains("in-viewport")) {
                solutionMenuLink1.classList.add("active");
                solutionMenuLink1.classList.add("tooltip");
                setTimeout(function() {
                    solutionMenuLink1.classList.remove("tooltip");
                }, 8000);
            } else {
                solutionMenuLink1.classList.remove("active");
                solutionMenuLink1.classList.remove("tooltip");
            }

            if (document.querySelector("#pillar2 .module-content").classList.contains("in-viewport")) {
                solutionMenuLink2.classList.add("active");
            } else {
                solutionMenuLink2.classList.remove("active");
            }

            if (document.querySelector("#pillar3 .module-content").classList.contains("in-viewport")) {
                solutionMenuLink3.classList.add("active");
            } else {
                solutionMenuLink3.classList.remove("active");
            }

            if (document.querySelector("#pillar4 .module-content").classList.contains("in-viewport")) {
                solutionMenuLink4.classList.add("active");
            } else {
                solutionMenuLink4.classList.remove("active");
            }

            if (document.querySelector("#pillar5 .module-content").classList.contains("in-viewport")) {
                solutionMenuLink5.classList.add("active");
            } else {
                solutionMenuLink5.classList.remove("active");
            }

            if (document.querySelector("#pillar6 .module-content").classList.contains("in-viewport")) {
                solutionMenuLink6.classList.add("active");
            } else {
                solutionMenuLink6.classList.remove("active");
            }

            if (document.querySelector("#practices .module-content").classList.contains("in-viewport")) {
                solutionMenuLink7.classList.add("active");
            } else {
                solutionMenuLink7.classList.remove("active");
            }

            if (document.querySelector("#pillar1 .module-content").classList.contains("below-viewport")) {
                solutionsMenu.classList.add("hide");
            } else {
                solutionsMenu.classList.remove("hide");
            }
        }
        window.addEventListener('resize', solutionMenuLinks);
        window.addEventListener('scroll', solutionMenuLinks);
        solutionMenuLinks();

    };

    //  Footer: Shrink body of page when the footer is rearched and hide navigation

    if (document.getElementsByClassName('footer')[0]) {


        var footer = document.getElementsByClassName('footer')[0];
        var masthead = document.getElementsByClassName('masthead')[0];

        if (document.getElementsByClassName('body-wrapper')[0]) {
            var bodyWrapper = document.getElementsByClassName('body-wrapper')[0];
        }

        function footerInViewport() {
            var footerTop = footer.getBoundingClientRect().top;


            if (footerTop <= (window.innerHeight * 2)) {
                bodyWrapper.classList.add('pre-shrink'); // Add class pre-shrink to reset some fade-in styling
            } else {
                bodyWrapper.classList.remove('pre-shrink'); //

            }

            if (footerTop <= (window.innerHeight / 3 * 2)) {
                bodyWrapper.classList.add('shrink'); // Shrink body of page
                masthead.classList.add('important-hiding'); // Hide navigation
            } else {
                bodyWrapper.classList.remove('shrink');
                masthead.classList.remove('important-hiding');
            }
        }
        // Bind it on scroll, load and resize.
        window.addEventListener('resize', footerInViewport);
        window.addEventListener('scroll', footerInViewport);
        footerInViewport();

    }

    // Scroll to the top of the page, in case form-input has attribute autofocus. Otherwise it would scroll half page to the autofocusing input

    if (document.getElementsByClassName('form-input')[0]) {

        var formInputAutofocus = document.querySelectorAll('.form-field:first-of-type .form-input');

        for (var i = 0; i < formInputAutofocus.length; i++) {
            if (formInputAutofocus[i].hasAttribute("autofocus")) {
                console.log("there's an autofocus on the page");
                setTimeout(function() {
                    window.scrollTo(0, 0);
                }, 100);
            }
        }
    }


    // Google Map
    // When the window has finished loading create our google map below

    if (document.getElementById("map")) {

        console.log("google maps loaded");

        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 14,

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




    // Add parallax effect to background-images

    if (document.getElementsByClassName("image__parallax")[0]) {

        imageParallax = document.getElementsByClassName("image__parallax");

        [].forEach.call(imageParallax, function(image) {

            imageParallaxFn = function() {

                var rect = image.parentElement.getBoundingClientRect();

                parentHeight = image.parentElement.clientHeight;
                // console.log("parentHeight " + parentHeight);

                divExcursion = parentHeight + window.innerHeight;
                // console.log("divExcursion " + divExcursion);

                imagePosition = rect.top + parentHeight;
                // console.log("imagePosition " + imagePosition);

                imagePercentage = imagePosition / divExcursion * 100;
                // console.log("imagePercentage " + imagePercentage);

                imageTranslateMax = 20 // This number is how much % the image will be translated maximum

                imageTranslate = (imageTranslateMax - (imageTranslateMax * 2 / 100 * imagePercentage)).toFixed(4);
                // console.log("imageTranslate " + imageTranslate);


                imageZoomMax = 10 // This is the maximum percentage the image will be zoomed when below the fold
                imageZoomMin = 0 // This is the minimum percentage the image will be zoomed when above the fold

                imageZoom = ((imageZoomMax / 100) * imagePercentage / 100) + 1;
                // console.log("imageZoom " + imageZoom);

                image.style.webkitTransform = "scale(" + imageZoom + ") translate3d(0," + imageTranslate + "%,0)";
                image.style.transform = "scale(" + imageZoom + ") translate3d(0," + imageTranslate + "%,0)";

            }

            window.addEventListener('scroll', imageParallaxFn);
            imageParallaxFn();
            window.addEventListener('resize', imageParallaxFn);

        })
    }





});
