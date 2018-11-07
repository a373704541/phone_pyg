$(function () {
    init();
    /* 初始化函数 */
    function init() {
        getFont();
        // getCategories();
        localAddress();
    }
    // 定义全局变量-分页数据
    var CategorieData;
    // 定去全局变量-初始化左侧滚动对象
    var myScroll;
    /* 动态设置字体 */
    function getFont() {
        // 字体大小/适配屏幕 = 基础值/设计屏幕

        var baseVul = 100;
        var designScreen = 375;
        var screenWidth = document.querySelector("html").offsetWidth;
        var designFont = baseVul * screenWidth / designScreen + "px";
        // console.log(designFont);
        document.querySelector("html").style.fontSize = designFont;
    }
    window.onresize = function () {
        getFont();
    }
    /* 获取分页数据 */
    function getCategories() {

        $.get("categories", function (res) {
            if (res.meta.status == 200) {
                // console.log(res);
                CategorieData = res.data;

                renderLeft();

                /* 初始化左侧数据 */
                myScroll = new IScroll('.pyg_left');
               
                localStorage.setItem("cates", JSON.stringify({
                    data: CategorieData,
                    time: Date.now()
                }))
                renderRight(0)
            }
        })

    }
    /* 渲染左侧数据 */
    function renderLeft() {
        /* 渲染左侧数据 */
        var htmlStr = template("CategoriesLeftTemp", {
            data: CategorieData
        });
        $(".pyg_left ul").html(htmlStr);

    }
    /* 渲染右侧数据 */
    function renderRight(index) {
        
        var htmlStr1 = template("CategoriesRightTemp", {
            data: CategorieData[index].children
        })
        $(".pyg_right").html(htmlStr1);


        /* 图片加载完毕才要滚动 */
        var num = $(".pyg_right img").length;
        $(".pyg_right img").on("load", function () {
            num--
            if (num == 0) {
                var rightScroll = new IScroll(".pyg_right");

            }
        })
    }

    /* 注册tap事件 */
    $(".pyg_left ul").on("tap", "li", function () {
        // 排他思想
        $(this).addClass("active").siblings().removeClass("active");
        // 置顶页面
        myScroll.scrollToElement(this);
        // 获取index
        var index = $(this).index();
        // console.log(index);
        // 渲染指定页面
        renderRight(index);
    })

    /* 本地存储 */
    function localAddress() {
        var localDataStr = localStorage.getItem("cates");
        // 判断是否存在
        if(!localDataStr){
            getCategories();
        }else {
            var localData =JSON.parse(localDataStr); 
            CategorieData =localData.data;
            console.log(1111);
            renderLeft();
            renderRight(0);
        }
    }

})