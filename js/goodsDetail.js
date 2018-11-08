$(function () {
    
    getDetailData();
    /* 初始化操作 */
    init();
    function init() {
        getDetailData();
    }
    function slideInit(){
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
        });
        console.log(gallery);
    }

    // 获取商品详情模板
    function getDetailData() {
        $.get("goods/detail", {
            goods_id: getUrl("goods_id")
        }, function (res) {
            if (res.meta.status == 200) {
                // console.log(res);

                var htmlStr = template("detailTemp", {
                    data: res.data
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
})