$(function () {
    // 去注册账号
    $('#goToRegi').click(function () {
        // 显示注册
        $('.register').show();
        // 隐藏登录
        $('.login').hide();
    })

    // 去登录账号.
    $('#goToLogin').click(function () {
        // 显示登录
        $(".login").show();
        //隐藏注册
        $(".register").hide();
    })

    // 从 
    let form = layui.form;
    let layer = layui.layer;


    // 表单校验
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
                if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                    return '用户名不能有特殊字符';
                }
                if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                    return '用户名首尾不能出现下划线\'_\'';
                }
                if (/^\d+\d+\d$/.test(value)) {
                    return '用户名不能全为数字';
                }

                //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
                if (value === 'xxx') {
                    alert('用户名不能为敏感词');
                    return true;
                }
            }

            //我们既支持上述函数式的方式，也支持下述数组的形式
            //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
            ,
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repass: function (value, item) {
            //value：表单的值、item：表单的DOM对象
            console.log(value);
            let $mima = $('.mima').val();
            console.log($mima);
            if (value !== $mima) {
                return '两次密码不一致';
            }
        }
    });

    // 实现注册功能
    $('#regiForm').on('submit', function (e) {
        e.preventDefault();

        let data = $(this).serialize();
        // console.log(data);

        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    // return console.log(res.message);
                    return layer.msg(res.message);

                }
                // console.log('注册成功');
                layer.msg(res.message);

                $('#regiForm')[0].reset();

                $('#goToLogin').click();
            }
        })
    })


    $('#loginForm').on('submit', function (e) {
        e.preventDefault();
        let data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: "/api/login",
            data,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    // 
                    return layer.msg(res.message);
                }
                // layer.msg(res.message);

                // location.href = "/11-大事件/bigmatter/home/index.html";

                // 登录成功
                localStorage.setItem('token', res.token);

                layer.msg('登录成功,即将跳转首页', {
                    icon: 1,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    location.href = "/11-大事件/bigmatter/home/index.html";
                });

            }
        })
    })
})