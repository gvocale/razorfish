$(document).ready(function() {

    $(window).scroll(function(d, h) {

        if ($(window).scrollTop() >= $('.client1').offset().top) {
            $('.client1').addClass("fadein", true);
            $('.text1').removeClass("visible", true);
            $('.text2').addClass("visible", true);
        }

        if ($(window).scrollTop() >= ($('.client1').offset().top) + $('.client1').height()) {
            $('.client1').removeClass("fadein", true);
        }

        if ($(window).scrollTop() >= $('.client2').offset().top) {
            $('.client2').addClass("fadein", true);
				$('.text2').removeClass("visible", true);
            $('.text3').addClass("visible", true);
        }

        if ($(window).scrollTop() >= ($('.client2').offset().top) + $('.client2').height()) {
            $('.client2').removeClass("fadein", true);
        }

        if ($(window).scrollTop() >= $('.client3').offset().top) {
            $('.client3').addClass("fadein", true);
        }

        if ($(window).scrollTop() >= ($('.client3').offset().top) + $('.client3').height()) {
            $('.client3').removeClass("fadein", true);
        }                

    });
});
