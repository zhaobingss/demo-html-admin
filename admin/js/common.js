/**
 * Created by zhaobing on 2017/7/4.
 */

$(function () {

    function containerHeight() {
        var availableHeight = $(window).height() - $('body > .navbar').outerHeight() - $('body > .navbar + .navbar').outerHeight() - $('body > .navbar + .navbar-collapse').outerHeight();
        $('.page-container').attr('style', 'min-height:' + availableHeight + 'px');
    }

    $(window).resize(function () {
        containerHeight();
    });

    containerHeight();

});


