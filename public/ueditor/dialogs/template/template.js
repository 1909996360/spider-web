/**
 * Created with JetBrains PhpStorm.
 * User: xuheng
 * Date: 12-8-8
 * Time: 下午2:09
 * To change this template use File | Settings | File Templates.
 */
(function () {
    var parent = window.parent;
    //dialog对象
    dialog = parent;
    //当前打开dialog的编辑器实例
    editor = dialog.editor;

    UE = parent.UE;

    domUtils = UE.dom.domUtils;

    utils = UE.utils;

    browser = UE.browser;

    ajax = UE.ajax;

    $G = function ( id ) {
        return document.getElementById( id )
    };
    //focus元素
    $focus = function ( node ) {
        setTimeout( function () {
            if ( browser.ie ) {
                var r = node.createTextRange();
                r.collapse( false );
                r.select();
            } else {
                node.focus()
            }
        }, 0 )
    };
  
    var me = editor,
            preview = $G( "preview" ),
            preitem = $G( "preitem" ),
            tmps=[],
            currentTmp;
    var initPre = function () {
        var str = "";
        var p={
            // "custGlobalId":window.sessionStorage.getItem("custGlobalId"),
            "fileType":"other",
            "groupId":10001,
            "orgCode":window.sessionStorage.getItem("orgCode"),
            "pageSize":50
            };
        $.ajax({
            url: UE.getSuiyueHost()+"api/pc/fileUpload/selectFileUploadPage",
            type: 'get',
            data: p,
            headers:{openId:window.sessionStorage.getItem("openId")},
            success: function (res){
              console.log(res);
              tmps=res.dataList?res.dataList:[];
            for ( var i = 0, tmp; tmp = tmps[i++]; ) {
                str += '<div class="preitem" onclick="pre(' + i + ')"><span style="float:left;">'+tmp.fileName+'</span><i style="float:right;" class="layui-icon layui-icon-close" onclick="deletetemp('+tmp.fileId+','+i+');"></i></div>';
            }
            preitem.innerHTML = str;
            },complete:function(data){
                pre(1);
            }
       });

    };
    
    var pre = function ( n ) {
       // console.log(n);
       if(tmps==null||tmps.length==0) {
           preview.innerHTML = '<div style="margin-top:100px;text-align:center;color:#888;">您还没有模板，请先制作并保存您的模板</div>';
           currentTmp={};
       }
        var tmp = tmps[n - 1];
        currentTmp = tmp;
        clearItem();
        domUtils.setStyles( preitem.childNodes[n - 1], {
            "background-color":"#1e9fff",
            "color":"#fff"
        } );
        preview.innerHTML = tmp.content ? tmp.content : "";
    };
    var clearItem = function () {
        var items = preitem.children;
        for ( var i = 0, item; item = items[i++]; ) {
            domUtils.setStyles( item, {
                "background-color":"",
                "color":""
            } );
        }
    };
    dialog.onok = function () {

        if(currentTmp==null || currentTmp.content=="") return;
       
        if ( !$G( "issave" ).checked ){
            me.execCommand( "cleardoc" );
        }
        var obj = {
            html:currentTmp && currentTmp.content
        };
        me.execCommand( "template", obj );
    };
    var deletetemp=function(fileId,i){
        var p={
            "staffId":window.sessionStorage.getItem("staffId"),
            "fileIds":fileId
            };
        $.ajax({
            url: UE.getSuiyueHost()+"api/pc/fileUpload/deleteFiles",
            type: 'post',
            data: p,
            headers:{openId:window.sessionStorage.getItem("openId")},
            success: function (res){
              console.log(res);
              if(res&&res.code=='200'){
                initPre();
              }else{
                parent.layer.msg("删除出错，请重试");
              }
            },complete:function(data){
                
            }
       });
    }
    initPre();
    window.pre = pre;
    window.deletetemp = deletetemp;

})();