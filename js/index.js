window.onload = function () {
    init();
    /* 初始化 */
    function init() {
        getSlideImg();
        getSwiperdata();
        getCatitems();
        getGoodslist();
    }
    /* 轮播插件 */
    function getSlideImg() {
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
        });
    }
    /* 获取轮播的数据 */
    function getSwiperdata(){
        $.get("home/swiperdata",function(res){
            // console.log(res);
            if(res.meta.status==200){
                var htmlStr = template("slidesTemp",{data:res.data});
                $(".mui-slider").html(htmlStr);
                getSlideImg();
            }
        })
    }
    /* 获取分类菜单数据 */
    function getCatitems(){
        $.get("home/catitems",function(res){
            if(res.meta.status==200){
                var htmlStr = template("catagloryTemp",{
                    data:res.data
                })
                $(".pyg_cataglory").html(htmlStr);
            }
        })
    }  
    
    /* 获取商品列表数据 */
    function getGoodslist(){
        $.get("home/goodslist",function(res){
            var htmlStr = template("goodsListTemp",{
                data:res.data
            })
            $(".goodsList").html(htmlStr);
        })
    }
}