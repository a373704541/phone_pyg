$(function () {
    /* 全局变量 */
    var DataCode;
    /* 初始化函数 */
    init();

    function init() {
        eventList();
    }
    /* 封装事件函数 */
    function eventList() {
        // 注册验证函数事件
        $("#authCode").on("tap", function () {
            /* 
                分析验证码效果
                    1.手机号码不合法不能验证
                    2.输入框要变成倒计时的效果
            */
            var phone_text = $("[name='userPhone']").val().trim();
            // console.log(phone_text);
            // console.log($.checkPhone(phone_text));
            // 为true 执行以下逻辑代码
            if ($.checkPhone(phone_text)) {
                // 发送验证码请求
                $.post("users/get_reg_code", {
                    mobile: phone_text
                }, function (res) {
                    console.log(res);
                    if (res.meta.status == 200) {
                        DataCode = res.data;
                    } else {
                        mui.toast(res.meta.msg);
                    }
                })
                var time = 5;
                $(this).attr("disabled", "disabled");
                $("#authCode").text("获取验证码" + 5 + "秒");
                var timeId = setInterval(function () {
                    time--;
                    $("#authCode").text("获取验证码" + time + "秒");
                    if (time == 0) {
                        clearTimeout(timeId);
                        $("#authCode").removeAttr("disabled");
                        $("#authCode").text("获取验证码");
                    }
                }, 1000)
            } else {
                mui.toast("输入手机号码不合法");
            }



        })
        // 注册"注册"函数事件
        $(".registerBtn").on("tap", function () {
            /* 
                业务逻辑
                    1. 判断是否合法
                    2. 需要全部的值
            */
            // 获取所有的值
            var phone_text = $("[name='userPhone']").val().trim(); // 手机
            console.log(phone_text);
            var authcode_text = $("[name='userAuthCode']").val().trim(); // 验证码
            var email_text = $("[name='userEmail']").val().trim(); // 邮箱
            var pwd_text1 = $("[name='userpwd']").val().trim(); //密码
            var pwd_text2 = $("[name='userResetPwd']").val().trim(); // 重设密码
            var gender_text = $("[name='sex']:checked").val(); // 性别
            // 判断是否合法
            if (!$.checkPhone(phone_text)) {
                mui.toast("手机不合法");
                return;
            }
            if (authcode_text != DataCode) {
                mui.toast("验证码不正确");
                return;
            }
            if (!$.checkEmail(email_text)) {
                mui.toast("邮箱不合法")
                return;
            }
            if (pwd_text1.length < 6) {
                mui.toast("密码不合法")
                return;
            }
            if (pwd_text1 != pwd_text2) {
                mui.toast("密码没有确然好")
                return;
            }

            // 验证通过就把数据存储对象以此来获取数据
            var registerObj = {
                mobile: phone_text,
                code: authcode_text,
                email: email_text,
                pwd: pwd_text1,
                gender: gender_text
            }
            console.log(registerObj);
            
            // 发送请求
            $.post("users/reg", registerObj, function (res) {
                console.log(res);
                if (res.meta.status == 200) {
                    mui.toast("注册成功");
                    setInterval(function () {
                        location.href = "../pages/login.html"
                    }, 1000)
                } else {
                    mui.toast(res.meta.msg);
                }
            })
        })
    }
})