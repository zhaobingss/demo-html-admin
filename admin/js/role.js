
$(function () {
    initWindowEvent();
    initPager();
});

function initWindowEvent() {
    adjustContentTop();
    $(window).resize(function () {
        adjustContentTop();
    });
}

function initPager() {
    layui.laypage({
        cont: 'pager',
        pages: 100,
        skip: true,
        jump: function(obj, first){
            if(!first){
                layer.msg('第 '+ obj.curr +' 页');
            }
        }
    });
}

function adjustContentTop() {
    var height = $('.opera').outerHeight();
    $('.content-wrapper>.content').css('margin-top', height+'px');
}