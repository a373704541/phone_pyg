$(function () {
    // 拦截器
    // 设置公共URL 
    var baseUrl = "http://api.pyg.ak48.xyz/api/public/v1/";
    $.ajaxSettings.beforeSend = function (xhr, obj) {
        // console.log(obj);
        obj.url = baseUrl + obj.url;
    }
})