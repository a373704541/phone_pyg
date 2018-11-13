$(function () {
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
        },
        /* 判断是否登陆了 */
        isLogin: function () {
            var loginMessage = JSON.parse(sessionStorage.getItem("loginMessage"));
            if (loginMessage) {
                return true;
            } else {
                return false;
            }
        },

        /* 设置用户的信息 */
        setUserInfo:function(userData){
            sessionStorage.setItem("loginMessage", JSON.stringify(userData));
        },
        
        /* 获取用户的信息 */
        getUserinfo: function () {
            return JSON.parse(sessionStorage.getItem("loginMessage"));
        },
        /* 设置本地存储地址 */
        setUrl: function () {
            sessionStorage.setItem("goodsDetailUrl", location.href);
        },
        /* 获取本地存储地址 */
        getUrl: function () {
            sessionStorage.getItem("goodsDetailUrl");
        },

    })
    // 拦截器
    // 设置公共URL 
    var baseUrl = "http://api.pyg.ak48.xyz/api/public/v1/";
    $.ajaxSettings.beforeSend = function (xhr, obj) {
        // console.log(obj);
        obj.url = baseUrl + obj.url;
        // 增加加载样式
        $("body").addClass("waitIng");
        // console.log(xhr);

        // 判断是否是私有路径
        if(obj.url.indexOf("/my")!=-1){
            
            // console.log($.getUserinfo());
            // debugger;
            xhr.setRequestHeader("Authorization", $.getUserinfo().token);
        }
            
    }
    $.ajaxSettings.complete = function () {
        $("body").removeClass("waitIng");
    }

    // 模板
    // template.defaults.imports.imgUrl = "www.baidu.com"



})