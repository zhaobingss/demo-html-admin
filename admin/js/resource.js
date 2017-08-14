
$(function () {
    initResource();
    initWindowEvent();
    resizeTableWrapper();
    initOperaEvent();
});

function initWindowEvent() {
    $(window).resize(function () {
        resizeTableWrapper();
    });
}

function resizeTableWrapper() {
    var searchHeight = $('.opera').outerHeight();
    $('.tabble-wrapper').css('margin-top', searchHeight+'px');
}

function initOperaEvent() {
    $('#expend').click(function () {
        $('.tree').treegrid('getRootNodes').treegrid('expand');
    });
    $('#collapse').click(function () {
        $('.tree').treegrid('getRootNodes').treegrid('collapse');
    });
    $('#add').click(function () {
        layer.open({
            title:'<i class="iconfont icon-add"></i><span>添加资源</span>',
            type: 1,
            skin: 'layui-layer-rim', //加上边框
            area: ['100%', '100%'], //宽高
            content: document.getElementById('dialog').innerHTML,
            btn: ['&nbsp;确定', '&nbsp;取消'],
            yes:function () {
                var data = getDialogData();
                alert(JSON.stringify(data));
            },
            btn2:function () {
                cleanDualogInput();
            }
        });
    });
}

function cleanDualogInput() {
    $('#src_name').val('');
    $('#src_type').val('');
    $('#src_code').val('');
    $('#src_url').val('');
    $('#src_icon').val('');
    $('#src_order').val('');
    $('#src_desc').val('');
}

function getDialogData() {
    var name = $('#src_name').attr('value');
    var type    = $('#src_type').val();
    var code    = $('#src_code').val();
    var url     = $('#src_url').val();
    var icon    = $('#src_icon').val();
    var order   = $('#src_order').val();
    var desc    = $('#src_desc').val();

    return {
        name:name,
        type:type,
        code:code,
        url:url,
        icon:icon,
        order:order,
        desc:desc
    }
}

function initResource() {
    setResource();
    $('.tree').treegrid();
}

function setResource() {
    var tbody = document.getElementById('src_data');
    var data = getResourceData();
    for (var idx = 0; idx < data.length; idx++){
        var src = data[idx];
        createTrs(tbody, src, null);
    }
}

function createTrs(tbody, src, pid) {
    var tr = document.createElement('tr');
    var cls = 'treegrid-'+src.id;
    tr.className += cls;
    if (pid){
        tr.className += ' treegrid-parent-'+pid;
    }

    var td_src_name     = document.createElement('td');
    var td_src_icon     = document.createElement('td');
    var td_src_url      = document.createElement('td');
    var td_src_type     = document.createElement('td');
    var td_src_desc     = document.createElement('td');
    var td_src_opera    = document.createElement('td');

    var i = document.createElement('i');
    i.className += ' '+src.icon;
    td_src_name.appendChild(i);
    var span_name = document.createElement('span');
    span_name.innerText = src.name;
    td_src_name.appendChild(i);
    td_src_name.appendChild(span_name);

    td_src_icon.innerText   = src.icon;
    td_src_url.innerText    = src.url;
    td_src_type.innerText   = src.type;
    td_src_desc.innerText   = src.desc;

    var buttonMod = document.createElement('button');
    i = document.createElement('i');
    i.className += ' iconfont icon-edit';
    buttonMod.appendChild(i);
    buttonMod.className += ' btn btn-sm btn-primary';
    var span = document.createElement('span');
    span.innerText = '编辑';
    buttonMod.appendChild(span);

    var buttonDel = document.createElement('button');
    i = document.createElement('i');
    i.className += ' iconfont icon-delete1';
    buttonDel.appendChild(i);
    buttonDel.className += ' btn btn-sm btn-danger';
    span = document.createElement('span');
    span.innerText = '删除';
    buttonDel.appendChild(span);

    var input = document.createElement('input');
    input.setAttribute('value', src.id);
    input.style.display = 'none';

    td_src_opera.appendChild(buttonMod);
    td_src_opera.appendChild(buttonDel);
    td_src_opera.appendChild(input);

    tr.appendChild(td_src_name);
    tr.appendChild(td_src_icon);
    tr.appendChild(td_src_url);
    tr.appendChild(td_src_type);
    tr.appendChild(td_src_desc);
    tr.appendChild(td_src_opera);

    tbody.appendChild(tr);

    if (src.children != null && src.children.length > 0){
        for (var idx in src.children){
            var child = src.children[idx];
            createTrs(tbody, child, src.id);
        }
    }
}

function getResourceData() {
    return [
        {
            "id":"aaa",
            "name":"系统管理",
            "icon":"iconfont icon-system",
            "url":"",
            "type":"",
            "desc":"",
            "children":[
                {
                    "id":"bbb",
                    "name":"资源管理",
                    "icon":"iconfont icon-resource",
                    "url":"",
                    "type":"",
                    "desc":"",
                    "children":[]
                },
                {
                    "id":"ddd",
                    "name":"角色管理",
                    "icon":"iconfont icon-role",
                    "url":"",
                    "type":"",
                    "desc":"",
                    "children":[]
                },
                {
                    "id":"eee",
                    "name":"用户管理",
                    "icon":"iconfont icon-user3",
                    "url":"",
                    "type":"",
                    "desc":"",
                    "children":[]
                }
            ]
        }
    ]
}