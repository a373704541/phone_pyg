$(function () {
    getFont();
    getLeftCategories();
    getRightCategories();
    function getFont() {
        // 字体大小/适配屏幕 = 基础值/设计屏幕

        var baseVul = 100;
        var designScreen = 320;
        var screenWidth = document.querySelector("html").offsetWidth;
        var designFont = baseVul * screenWidth /designScreen + "px";
        // console.log(designFont);
        document.querySelector("html").style.fontSize = designFont;
    }
    window.onresize = function(){
        getFont();
    }

    //渲染左侧分类模板
    function getLeftCategories(){
        $.get("http://api.pyg.ak48.xyz/api/public/v1/categories",function(res){
            console.log(res);
            if(res.meta.status==200){
                var htmlStr = template("catelogeryLeft",{
                    data:res.data
                });
                $(".pv_left ul").html(htmlStr);
            }
        })
    }

    //渲染右侧分类模板
    function getRightCategories(){
        $.get("http://api.pyg.ak48.xyz/api/public/v1/categories",function(res){
            console.log(res.data[0].children);
            if(res.meta.status==200){
                var htmlStr = template("catelogeryRight",{
                    data:res.data
                });
                $(".pv_right").html(htmlStr);
            }
        })
    }
})