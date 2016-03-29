// Break headlines in different lines
$(document).ready(function() {
            var spanInserted = $('.hero__headline').html().split(" ").join(" </span><span>");
            var wrapped = ("<span>").concat(spanInserted, "</span>");
            $('.hero__headline').html(wrapped);
            var refPos = $('.hero__headline span:first-child').position().top;
            var newPos;
            $('.hero__headline span').each(function(index) {
                newPos = $(this).position().top
                if (index == 0) {
                    return;
                }
                if (newPos == refPos) {
                    $(this).prepend($(this).prev().text() + " ");
                    $(this).prev().remove();
                }
                refPos = newPos;
            });
        }
