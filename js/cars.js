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

            /* 获取订单数据 */
            gerorderData();
            /* 事件函数 */
            evevntList();
        }

    }

    /* 渲染订单列表 */
    function gerorderData() {
        $.get("my/cart/all", function (res) {
            if (res.meta.status == 200) {
                // console.log(res);
                var cartObj = JSON.parse(res.data.cart_info)
                var htmlStr = template("orderListTemp", {
                    data: cartObj
                })
                $(".orderList").html(htmlStr);

                mui("#numbtnChk").numbox() // 初始化
                /* 获取总价格 */
                getTotalPrice();
            } else {
                mui.toast(res.meta.msg);
            }
        })
    }

    /* 动态获取价格 */
    function getTotalPrice() {
        // 通过li标签获取价格
        var $lis = $(".orderList li");
        // 定义一个总价的变量
        var totalPrice = 0;
        for (var i = 0; i < $lis.length; i++) {
            var li = $lis[i];
            var goods_obj = $(li).data("obj")
            totalPrice += goods_obj.goods_price * $(li).find(".mui-input-numbox").val();
        }
        // 将钱给上面的总价
        $(".totalPrice_content_price2").text(totalPrice);
    }

    /* 动态事件 */
    function evevntList() {
        // 委托事件实现点击事件
        $(".orderList").on("tap", ".mui-numbox .mui-btn", function () {
            getTotalPrice();
        })
        /* 编辑完成替换 */
        /**
         *  当我点击头上编辑  替换 完成
         *  注册事件
         */
        $("#editBtn").on("tap", function () {
            $("body").toggleClass("editStatus");
            // 判断类       
            if ($("body").hasClass("editStatus")) {
                $("#editBtn").text("完成");
                /* 当完成时购物清单更新 */
            } else {
                $("#editBtn").text("编辑");
                editCart();
            }

        })

        /* 删除事件 */
        $("#deleBtn").on("tap", function () {
            // 判断有没有数据
            // 获取选中的LI 
            var select_li = $(".order_chk_btn:checked").parents("li");
            // console.log(select_li);
            if (select_li.length == 0) {
                mui.toast("你没选中任何东西");
                return;
            }
            mui.confirm("你确定删除", "提示", ["删除", "取消"], function (eType) {
                if (eType.index == 0) {
                    // 开始同步数据
                    var $notSelect_li = $(".order_chk_btn").not(":checked").parents("li");
                    getSync($notSelect_li)
                }
            })
        })

        /* 生成订单 */
        $(".createOrder").on("tap", function () {
            // console.log(111);
            // 判断有没有数据
            var $lis = $(".orderList li");
            if ($lis.length == 0) {
                mui.toast("没有数据");
                return;
            }
            // 获取参数
            var usefinfo = {
                order_price: $(".totalPrice_content_price2").text(),
                consignee_addr: "火星天足省夏中市",
                goods: []
            }
            // 获取goods需要循环
            // 定义变量
            var goodsobj = {}
            var goods = {}
            // console.log($lis);
            for (var i = 0; i <= $lis.length - 1; i++) {
                // 获取每个LI
                var li = $($lis);
                // 为每个li存储对象
                goodsobj = $(li).data("obj");
                // 存储到goods数据里面
                var tempObj = {
                    "goods_id": goodsobj.goods_id,
                    "goods_number": $(li).find(".mui-input-numbox").val(),
                    "goods_price": goodsobj.goods_price
                }
            }

            // console.log(tempObj);
            usefinfo.goods.push(tempObj);
            // console.log(usefinfo);
            // 开始发送请求
            $.post("my/orders/create", usefinfo, function (res) {
                if (res.meta.status == 200) {
                    mui.toast(res.meta.msg)
                    setInterval(function () {
                        location.href = "../pages/order.html";
                    }, 1000)

                } else {
                    mui.toast(res.meta.msg)
                }
            })
        })

    }

    /* 编辑事件 */
    function editCart() {
        // 判断有没有数据
        var $lis = $(".orderList li");
        if ($lis.length == 0) {
            mui.toast("没有数据");
            return;
        }
        getSync($lis)
    }


    // 封装同步函数
    function getSync($lis) {
        // 同步购物车
        var goods_obj = {};
        var infos = {};
        for (var i = 0; i <= $lis.length - 1; i++) {
            var li = $($lis)[i];
            // console.log(li);
            goods_obj = $(li).data("obj");
            goods_obj.amount = $(li).find(".mui-input-numbox").val();
            // console.log(goods_obj);
            infos[goods_obj.goods_id] = goods_obj;
        }
        // console.log(infos);
        $.post("my/cart/sync", {
            infos: JSON.stringify(infos)
        }, function (res) {
            if (res.meta.status == 200) {
                mui.toast(res.meta.msg);
                gerorderData();
            } else {
                mui.toast(res.meta.msg);
            }
        })
    }
})