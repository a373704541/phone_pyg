$(function () {
    // 拦截器
    // 设置公共URL 
    var baseUrl = "http://api.pyg.ak48.xyz/api/public/v1/";
    $.ajaxSettings.beforeSend = function (xhr, obj) {
        // console.log(obj);
        obj.url = baseUrl + obj.url;
        // 增加加载样式
        $("body").addClass("waitIng");
        console.log(111);
    }
    $.ajaxSettings.complete = function(){
        $("body").removeClass("waitIng");
    }
})