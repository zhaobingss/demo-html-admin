
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
        var dialog = document.getElementById('dialog');
        var content = dialog.innerHTML;
        layer.open({
            title:'<i class="iconfont icon-add"></i><span>添加资源</span>',
            type: 1,
            skin: 'layui-layer-rim',
            area: ['70%', '80%'],
            content: content,
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
    $('.edit').click(function () {
        var dialog = document.getElementById('dialog');
        var content = dialog.innerHTML;
        layer.open({
            title:'<i class="iconfont icon-edit"></i><span>修改资源</span>',
            type: 1,
            skin: 'layui-layer-rim',
            area: ['70%', '80%'],
            content: content,
            btn: ['&nbsp;确定', '&nbsp;取消'],
            yes:function (index) {
                var data = getDialogData();
                alert(JSON.stringify(data));
                addResource();
            },
            btn2:function () {
                cleanDualogInput();
            }
        });
    });
    $('.delete').click(function () {
        layer.msg('你确定删除这个资源么？', {
            time: 0,
            btn: ['&nbsp;确定', '&nbsp;取消'],
            closeBtn:2,
            shade:0.3,
            yes: function(index){
                alert('ok');
                layer.close(index);
            }
        });
    });
}

function addResource() {
    $.ajax({
        url:'',
        type:'POST',
        dataType:'json',
        cache:false,
        async:false,
        success:function (data) {
            
        },
        error:function (data) {
            
        }
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
    var name    = $('.layui-layer-content #src_name').val();
    var type    = $('.layui-layer-content #src_type').val();
    var code    = $('.layui-layer-content #src_code').val();
    var url     = $('.layui-layer-content #src_url').val();
    var icon    = $('.layui-layer-content #src_icon').val();
    var order   = $('.layui-layer-content #src_order').val();
    var desc    = $('.layui-layer-content #src_desc').val();

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

    var str = JSON.stringify(src);
    str = JSON.parse(str);
    delete str.children;

    var buttonMod = document.createElement('button');
    i = document.createElement('i');
    i.className += ' iconfont icon-edit';
    buttonMod.appendChild(i);
    buttonMod.className += ' btn btn-sm btn-primary edit';
    buttonMod.setAttribute('data', JSON.stringify(str));
    var span = document.createElement('span');
    span.innerText = '编辑';
    buttonMod.appendChild(span);

    var buttonDel = document.createElement('button');
    i = document.createElement('i');
    i.className += ' iconfont icon-delete1';
    buttonDel.appendChild(i);
    buttonDel.className += ' btn btn-sm btn-danger delete';
    span = document.createElement('span');
    span.innerText = '删除';
    buttonDel.appendChild(span);
    buttonDel.setAttribute('data', src.id);

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