/**
 * Created by zhaobing on 2017/7/5.
 */
$(function () {

    initWindowEvent();
    resizeHeight();
    resizeContent();
    initMenu();
    initMenuEvent();
    initTabEvent();
    initOperaEvent();
    initHeaderEvent();
    addTab("", "首页", "yyy", false);

});

function initWindowEvent() {
    $(window).resize(function () {
        adjustTab();
        resizeContent();
        resizeHeight();
    });
}

function initMenu() {
    var menu = getMenuData();
    var menus = menu['menu'];
    if (menus == null && menus.length < 1){
        console.log("sorrry we got no menus !")
        return;
    }

    $('.navigation').html('');

    var rootUl = document.getElementById('navigation');

    // document.get
    for (var idx in menus){
        var menu = menus[idx];
        setMenu(rootUl, menu);
    }
}

function initMenuEvent() {
    $('.navigation li a').click(function (e) {
        var len = $(this).parent('li').children('ul').length;
        if (len > 0){
            e.preventDefault();
            $(this).parent('li').not('.disabled').toggleClass('active').children('ul').slideToggle(250);
        }else {
            $('.navigation li a').each(function (e) {
                $(this).removeClass('li-without-ul-a-active');
            });
            $(this).addClass('li-without-ul-a-active');

            var id = $(this).attr('data-id');
            var hasOpen = false;
            $('.tab-bar-tabs .tab').each(function () {
                var id1 = $(this).attr('data-id');
                if (id == id1){
                    $(this).trigger('click');
                    hasOpen = true;
                }
            });
            
            if (!hasOpen){
                var url = $(this).attr('url');
                var name = $(this).children('span').text();
                addTab(url, name, id, true);
            }

            var width = $('body').outerWidth();
            if (width < 768){
                $('.btn-close-sidebar').trigger('click');
            }
        }
    });

    $('.navigation').find('li').has('ul').first().children('a').trigger('click');
}

function initTabEvent() {
    $('.tab-close').click(function () {
        var parent = $(this).parent('button');
        if (parent.hasClass('active')){
            var prev = parent.prev();
            if (prev != null && prev.length > 0){
                prev.trigger('click');
            }else {
                var next = parent.next();
                if (next != null && next.length > 0){
                    next.trigger('click');
                }
            }
        }
        var id = parent.attr('data-id');
        $('.tab-main>iframe[id="'+id+'"]').remove();
        parent.remove();
    });

    $('.tab-bar-tabs .tab').click(function () {
        $('.tab-bar-tabs .tab').each(function () {
            $(this).removeClass('active');
        });
        $(this).addClass('active');
        var id = $(this).attr('data-id');
        $('.navigation li a').each(function () {
            var len = $(this).parent('li').children('ul').length;
            if (len < 1){
                var newId = $(this).attr('data-id');
                if (newId == id){
                    $(this).addClass('li-without-ul-a-active');
                }else {
                    $(this).removeClass('li-without-ul-a-active');
                }
            }
        });

        $('.tab-main iframe').each(function () {
            var iframeId = $(this).attr('id');
            if (iframeId == id){
                $(this).show();
            }else {
                $(this).hide();
            }
        });

    });
}

function initOperaEvent() {

    $('#loction').click(function () {
        $('.tab-bar-tabs .tab').each(function () {
            if ($(this).hasClass('active')){
                var tabWidth = 0;
                $('.tab-bar-tabs .tab').each(function () {
                    tabWidth += $(this).outerWidth();
                });

                var tabBarWidth = $('.btn-operate-right').offset().left
                    - $('.btn-operate-left').offset().left
                    - $('.btn-operate-left').outerWidth();

                if (tabWidth <= tabBarWidth){
                    return;
                }

                var tabLoc = $(this).offset().left + $(this).outerWidth();
                var right = $('.btn-operate-right').offset().left;
                var left = $('.btn-operate-left').offset().left + $('.btn-operate-left').outerWidth();

                if (tabLoc > right){
                    var offsetRight = tabLoc - right;
                    var offset = $('.tab-bar-tabs').offset().left-41;
                    $('.tab-bar-tabs').animate({left: offset-offsetRight}, 200);
                }

                if (tabLoc < left){
                    var offsetLeft = left - tabLoc;
                    var offset = $('.tab-bar-tabs').offset().left-41;
                    $('.tab-bar-tabs').animate({left: offset+offsetLeft+$(this).outerWidth()}, 200);
                }
            }
        });
    });

    $('#closeAll').click(function () {
        $('.tab-bar-tabs .tab').each(function () {
            $(this).children('i').trigger('click');
        });
        adjustTab();
    });
    
    $('#closeOther').click(function () {
        $('.tab-bar-tabs .tab').each(function () {
            if (!$(this).hasClass('active')){
                $(this).children('i').trigger('click');
            }
        });
        adjustTab();
    });
    
    $('.btn-refresh').click(function () {
        $('.tab-bar-tabs .tab').each(function () {
            if ($(this).hasClass('active')){
                var id = $(this).attr('data-id');
                var iframe = $('.tab-main iframe[id="'+id+'"]');
                var src = iframe.attr('src');
                src += '?t='+Math.random();
                iframe.attr('src', src)
            }
        });
    });

    $('.btn-operate-right').click(function () {
        var tabLast = $('.tab-bar-tabs .tab').last();
        var right = tabLast.offset().left + tabLast.outerWidth();
        var left = $(this).offset().left;
        if (right > left){
            var offset = $('.tab-bar-tabs').offset().left-41;
            $('.tab-bar-tabs').animate({left: offset-100}, 100);
        }
    });
    
    $('.btn-operate-left').click(function () {
        var tabFirst = $('.tab-bar-tabs .tab').first();
        var left = tabFirst.offset().left;
        var right = $(this).offset().left+$(this).outerWidth();
        if (left < right && (left+tabFirst.outerWidth()) < right){
            var offset = $('.tab-bar-tabs').offset().left-41;
            $('.tab-bar-tabs').animate({left: offset+100}, 100);
        }else {
            $('.tab-bar-tabs').animate({left: $(this).offset().left}, 100);
        }
    });
}

function initHeaderEvent() {
    $('.btn-close-sidebar').click(function () {
        var left = $('.sidebar').offset().left;
        if (left >= 0){
            $('.sidebar').animate({left:-240}, 150, function () {
                $('.sidebar').width(0);
                adjustTab();
            });
        }else {
            $('.sidebar').width(240);
            $('.sidebar').animate({left:0}, 150, function () {
                adjustTab();
            });
        }
    });
}

function adjustTab() {
    var width = $('.btn-operate-right').offset().left
        - $('.btn-operate-left').offset().left
        - $('.btn-operate-left').outerWidth();
    var width1 = 0;
    $('.tab-bar-tabs .tab').each(function () {
        width1 += $(this).outerWidth();
    });

    var left = $('.btn-operate-left').offset().left+$('.btn-operate-left').outerWidth();
    var right = $('.tab-bar-tabs .tab').first().offset().left;

    if (width1 <= width || right > left){
        $('.tab-bar-tabs').animate({left: $('.btn-operate-left').offset().left}, 20);
    }
}

function addTab(url, name, id, closeable) {
    if (hasTab(id)){
        return $('.tab-bar-tabs .tab[data-id="'+id+'"]').trigger('click');
    }

    var tabs = document.getElementById('tab-bar-tabs');
    var btn = document.createElement('button');
    btn.className += " tab btn-zbss";
    btn.setAttribute('data-id', id);

    var span = document.createElement('span');
    span.innerText = name;
    btn.appendChild(span);

    if (closeable){
        var i = document.createElement('i');
        i.className += " fa fa-times-circle tab-close";
        btn.appendChild(i);
    }

    tabs.appendChild(btn);

    var tabMain = document.getElementById('tab-main');
    var iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.id = id;
    iframe.style.display = "none";

    tabMain.appendChild(iframe);

    initTabEvent();
    $('.tab-bar-tabs .tab[data-id="'+id+'"]').trigger('click');
}

function hasTab(id) {
    var ret = false;
    $('.tab-bar-tabs .tab').each(function () {
        var tabId = $(this).attr('data-id');
        if (tabId == id){
            ret = true;
        }
    });
    return ret;
}

function resizeHeight() {
    var availableHeight = $(window).height() - 102;
    $('.page-container').attr('style', 'min-height:' + availableHeight + 'px;');

    var tabBarHeight = $('.tab-bar').height();
    if ($('.tab-bar').is(':hidden')){
        tabBarHeight = 0;
    }
    $('.tab-main').attr('style', 'height:'+(availableHeight-tabBarHeight)+'px;');
}

function resizeContent() {
    var width = $('body').outerWidth();
    if (width <= 768){
        if ($('.sidebar').offset().left >= 0){
            $('.sidebar').animate({left:-240}, 100,function () {
                $('.sidebar').width(0);
            });
        }
        $('.tab-bar').hide();
    }else {
        if ($('.sidebar').offset().left < 0){
            $('.sidebar').width(240);
            $('.sidebar').animate({left:0}, 100);
        }
        $('.tab-bar').show();
    }
}

function setMenu(ul, menu) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    var hasUl = false;
    if (menu['children'] != null && menu['children'].length > 0){
        a.className += ' has-ul';
        hasUl = true;
    }

    a.href = 'javascript:void(0);';
    a.setAttribute('url', menu['url']);
    a.setAttribute('data-id', menu['id']);

    var icon_cls = menu['icon'];
    if (icon_cls != null && icon_cls != ''){
        var i = document.createElement('i');
        var icons = icon_cls.split(' ');
        for (var x in icons){
            i.className += " "+icons[x];
        }
        a.appendChild(i);
    }

    var span = document.createElement('span');
    span.innerText = menu['name'];
    a.appendChild(span);

    li.appendChild(a)

    if (hasUl){
        var ul_child = document.createElement('ul');
        ul_child.className += ' hidden-ul';
        var menus = menu['children'];
        for (var idx in menus){
            var menu = menus[idx];
            setMenu(ul_child, menu);
        }
        li.appendChild(ul_child);
    }

    ul.appendChild(li);
}


function getMenuData() {

    return {
        "menu":[
            {
                "name":"系统管理",
                "url":"",
                "icon":"iconfont icon-system",
                "id":"1",
                "children":[
                    {
                        "name":"资源管理",
                        "url":"resource.html",
                        "icon":"iconfont icon-resource",
                        "id":"1-1",
                        "children":[]
                    },
                    {
                        "name":"角色管理",
                        "url":"role.html",
                        "icon":"iconfont icon-role",
                        "id":"1-2",
                        "children":[]
                    },
                    {
                        "name":"用户管理",
                        "url":"",
                        "icon":"iconfont icon-user3",
                        "id":"1-3",
                        "children":[]
                    }
                ]
            }
        ]
    }



}


