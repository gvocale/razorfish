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

    $(".contact-form__form-group").addClass("close");

    $(".contact-form__link").click(function() {
        console.log('open form');
        $(".contact-form__overlay").addClass("display");
        $("html,body").css("overflow-y", "hidden");
        setTimeout(function() {
            $(".contact-form__background-image").addClass("visible blur scale");
        }, 10);
        setTimeout(function() {
            $(".contact-form__form-group").addClass("display");
        }, 100);
        setTimeout(function() {
            $(".contact-form__form-group").removeClass("close").addClass("open");
        }, 110);
    });

    $(".contact-form__back").click(function() { // On click on Back button
        $(".contact-form__form-group").removeClass("open").addClass("close");
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
            $(".contact-form__form-group").removeClass("open").addClass("close");
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
            $(".contact-form__confirmation-group").removeClass("open");
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


    // Feed: add class .animate to each .feed__item

    $('.feed__item').addClass('animate');



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

    // Resize clip-path of simple title based on viewport height

    var $simpleTitle = $('.simple-title'); //record the elem so you don't crawl the DOM everytime

    $(window).bind("load resize", function(e) { // refresh on load and resize

        var bottom = $simpleTitle.outerHeight(true); // find height of .simple-title
        $(".simple-title").css({ "-webkit-clip-path": "polygon(0 0, 100% 0, 100% " + bottom + "px, 0 " + bottom + "px)" });

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
        if ($(".approach__contact").is(".visible")) {
            $("#approach__shrink").addClass("shrink");
            $("#approach__shrink--far").addClass("shrink");
        }
        if (!$(".approach__contact").is(".visible")) {
            $("#approach__shrink").removeClass("shrink");
            $("#approach__shrink--far").removeClass("shrink");
        }
    });


    // Office-list Tab shifting between North America / Europe / Asia PAcific


    var x = $('.office-list__area:nth-child(1)').height();
    $('.office-list__area-container').css('height', x);
    $(".office-list").addClass("north-america");

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
            var x = $('.office-list__area:nth-child()').height();
            $('.office-list__area-container').css('height', x);
        }

    });
    $(document).ready(function() {
        $(".input-select").change(function() {
            if ($(".input-select option[value='none']").attr('select')) {
                $(".input-select").addClass("selected");
            }
        });
    });


    $(".office-list__item").each(function() {
        $(this).click(function() {
            $(this).addClass("open");
        });
    });


})
