$(function () {
    // 拦截器
    // 设置公共URL 
    var baseUrl = "http://api.pyg.ak48.xyz/api/public/v1/";
    $.ajaxSettings.beforeSend = function (xhr, obj) {
        // console.log(obj);
        obj.url = baseUrl + obj.url;
        // 增加加载样式
        $("body").addClass("waitIng");
    }
    $.ajaxSettings.complete = function () {
        $("body").removeClass("waitIng");
    }

    // 模板
    // template.defaults.imports.imgUrl = "www.baidu.com"

    $.extend($, {
        checkPhone: function (phone) {
            if (!(/^1[34578]\d{9}$/.test(phone))) {
                return false;
            } else {
                return true;
            }
        },
        checkEmail: function (myemail) {
            var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
            if (myReg.test(myemail)) {
                return true;
            } else {
                return false;
            }
        }
    })

})