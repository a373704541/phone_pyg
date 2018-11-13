$(function () {
    // 初始化
    init();

    function init() {
        // 权限验证 ***
        // 判断当前是否登陆网页，如果没有就返回登陆界面 
        // console.log($.isLogin());
        if (!$.isLogin()) {
            // 存储当地的地址
            $.setUrl();
            location.href = "../pages/login.html";
        } else {
            $("body").fadeIn();
            getOrderData();
        }
    }

    function getOrderData() {
        $.get("my/orders/all", {
            type: 1
        }, function (res) {
            if (res.meta.status == 200) {
                var htmlStr = template("orderListTemp", {
                    data: res.data
                })
                $(".pyg_order_list").html(htmlStr);
            }
        })
    }
})