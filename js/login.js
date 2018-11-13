$(function () {
    init();
    /* 初始化 */
    function init() {
        eventlist();
    }
    /* 获取登陆账号数据 */
    function getLogin() {
        // 获取用户名密码
        var username = $("[name='userPhone']").val().trim();
        var userpwd = $("[name='userpwd']").val().trim();
        // 发送请求
        $.post("login", {
            username: username,
            password: userpwd
        }, function (res) {
            if (res.meta.status == 200) {
                // 会话存储
                $.setUserInfo(res.data)
                var goodsDetailUrl = sessionStorage.getItem("goodsDetailUrl");
                if (goodsDetailUrl) {
                    location.href = goodsDetailUrl;
                } else {
                    location.href = "../index.html";
                }

            } else {
                mui.toast(res.meta.msg);
            }
        })
    }


    /* 事件函数 */
    function eventlist() {
        $(".loginBtn").on("tap", function () {
            getLogin();
        })
    }
})