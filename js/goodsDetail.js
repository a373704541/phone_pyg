$(function () {
    var GoodsDetailObj;
    // getDetailData();
    /* 初始化操作 */
    init();

    function init() {
        getDetailData();
        eventlist();
    }

    function slideInit() {
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
        });
    }

    // 获取商品详情模板
    function getDetailData() {
        $.get("goods/detail", {
            goods_id: getUrl("goods_id")
        }, function (res) {
            
            if (res.meta.status == 200) {
                
                GoodsDetailObj = res.data;
                var htmlStr = template("detailTemp", {
                    data: GoodsDetailObj
                })
                $(".view").html(htmlStr);
                slideInit();
            }
        })
    }

    /* 获取参数 */
    function getUrl(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }

    // 跳转页面
    function eventlist() {
        $("#goshopping").on("tap", function () {
            // 获取会话存储数据
            var isLogin = $.isLogin();
            // 判断是否登陆了
            if (!isLogin) {
                mui.toast("你还没有登陆,请重新登录")
                // 存储本地地址用于回跳
                $.setUrl();
                setInterval(function () {
                    location.href = "../pages/login.html"
                }, 1000)
                return;
            }
            // 发送请求 登陆了跳转页面
            // console.log(GoodsDetailObj);
            var loginMessageOtj = {
                cat_id: GoodsDetailObj.cat_id,
                goods_id: GoodsDetailObj.goods_id,
                goods_number: GoodsDetailObj.goods_number,
                goods_price: GoodsDetailObj.goods_price,
                goods_small_logo: GoodsDetailObj.goods_small_logo,
                goods_weight: GoodsDetailObj.goods_weight
            }
            // 存储info需求 
            var info = JSON.stringify(loginMessageOtj);
            $.post("my/cart/add", {
                info: info
            }, function (res) {
                if (res.meta.status == 200) {
                    mui.confirm("是否添加购物车", "温馨提示", "是否", function (eType) {
                        // console.log(index);
                        if (eType.index == 0) {
                            location.href = "cars.html";
                        } else if (eType == 1) {
                            console.log("你取消了");
                        }
                    })
                } else {
                    mui.toast(res.meta.msg);
                }
            })

        })
    }
})