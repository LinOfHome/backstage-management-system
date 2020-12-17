$(function () {
    let form = layui.form;
    let layer = layui.layer;

    form.verify({
        // oldPass: function (value, item) { 
        //     //value：表单的值、item：表单的DOM对象
        // },
        // 简写:

        // 新旧密码不能相同
        newPassword: (value) => {
            // console.log(value); // 新密码输入框的值
            // 获取原密码的值
            let oldPwd = $('[name=oldPwd]').val();
            if (value === oldPwd) {
                return '新密码不能和原密码一样！';
            }
        },
        // 两次输入的新密码必须相同
        confirmPassword: (value) => {
            // 获取到新密码的内容，和确认密码的value做比较
            let newPwd = $('[name=newPwd]').val();
            if (value !== newPwd) {
                return "两次输入的新密码不相同！";
            }
        },
        // 密码的校验
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ]
    });

    // 发送ajax请求实现密码重置
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        let data = $(this).serialize();

        $.ajax({
            url: "/my/updatepwd",
            type: 'POST',
            data,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新密码失败!' + res.message);
                }
                layer.msg(res.message);
                // 清空密码框
                $('.layui-form')[0].reset();
            }
        })
    })



})