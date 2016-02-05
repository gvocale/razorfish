$(document).ready(function() {

    function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }

    $(window).on("load scroll resize",function() {
        $('section').each(function() {
            if (isScrolledIntoView(this) === true) {
                $(this).addClass('in-view');
            }
            if (isScrolledIntoView(this) === false) {
                $(this).removeClass('in-view');
            }
        });
    });

});
