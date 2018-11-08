$(function () {
    /* 全局变量 */
    var Searchdata = {
        query: " ",
        cid: getUrl("cid"),
        pagenum: 1,
        pagesize: 10
    }
    var TotalPage = 1;
    init();
    /* 初始化页面 */
    function init() {
        getRefresh();
        get_AEvent();
    }
    /* 向下刷新 向上加载一页 */
    function getRefresh() {
        mui.init({
            pullRefresh: {
                container: ".view",
                down: {
                    auto: true,
                    //  触发下拉刷新时自动触发
                    callback: function () {
                        // 向下刷新时变为1
                        Searchdata.pagenum = 1;
                        // 结束下拉刷新
                        mui('.view').pullRefresh().endPulldownToRefresh();
                        // 下拉刷新代码
                        getSearchData(function (htmlStr) {
                            $(".gl_list").html(htmlStr);
                            //重置向上加载	
                            mui('.view').pullRefresh().refresh(true);
                        });
                    }
                },
                up: {
                    //  触发上拉刷新时自动触发
                    callback: function () {
                        // console.log("向上触发");
                        if (Searchdata.pagenum >= TotalPages) {
                            console.log("没有数据啦")
                            mui('.view').pullRefresh().endPullupToRefresh(true);
                        } else {
                            Searchdata.pagenum++;
                            mui('.view').pullRefresh().endPullupToRefresh();
                            // 上拉更新一页
                            getSearchData(function (htmlStr) {
                                $(".gl_list").append(htmlStr);
                            });
                        }

                    }
                }
            }
        });
    }
    // 获取列表模板
    function getSearchData(cb) {
        $.get("goods/search", Searchdata, function (res) {
            // console.log(Searchdata);
            // console.log(res);
            if (res.meta.status == 200) {
                var htmlStr = template("searchTemp", {
                    data: res.data.goods
                })
                TotalPages = Math.ceil(res.data.total / Searchdata.pagesize);
                // console.log(TotalPages);
                cb(htmlStr);
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

    /*注册a标签事件 */ /* MUI BUG */
    function get_AEvent(){
        $(".gl_list").on("tap","li",function(){
            var address= $(this).children().attr("href");
            
            location.href = address;
        })
    }
})