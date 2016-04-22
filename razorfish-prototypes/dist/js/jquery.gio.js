// This is the jQuery I am using on the various pages






// Video





$(function() {
    console.log('jquery works');

    // Toggle in-viewport / not-in-viewport classes for any div that has class .animate
    new cbpScroller(document.getElementById('animate-container'));


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
        console.log('open forum');
        $(".contact-form__overlay").removeClass("close").addClass("open--blurred");
        $("html,body").css("overflow-y", "hidden");
        setTimeout(function() {
            $(".contact-form__form-group").removeClass("close").addClass("open");
        }, 100);
    });
    $(".contact-form__back").click(function() {
        $(".contact-form__form-group").removeClass("open").addClass("close");
        setTimeout(function() {
            $(".contact-form__overlay").removeClass("open--blurred").addClass("close");
            $('html,body').css('overflow-y', 'auto');
        }, 400);


    });
    $('#form__submit').click(function() {
        $(".contact-form__form-group").removeClass("open").addClass("close");
        $(".contact-form__form").removeClass("open");
        $(".contact-form__overlay").removeClass("open--blurred").addClass("open--sharp");
        setTimeout(function() {
            $(".contact-form__confirmation-group").removeClass("close").addClass("open");
        }, 500);
        setTimeout(function() {
            $(".contact-form__confirmation-group").removeClass("open").addClass("close");
        }, 3000);
        setTimeout(function() {
            $(".contact-form__overlay").removeClass("open--sharp").addClass("close");
            $('html,body').css('overflow-y', 'auto');
        }, 3500);
    });


    // Form: if in select.form__select an option is selected, add class .selected
    $(".form__select").each(function() {
        $(this).change(function() {
            $(this).addClass("selected");
        });
    });


    // Feed: on scroll, if feed tile is in viewport, add class in-viewport

    $('.feed__item').addClass('animate');

    $(window).scroll(function() {
        $(".feed__item:in-viewport").each(function() {
            $(this).addClass('in-viewport');
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

})
