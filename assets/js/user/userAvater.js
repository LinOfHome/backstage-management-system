$(function () {
    let layer = layui.layer;

    // 1.1 获取裁剪区域的 DOM 元素
    let $image = $('#image');

    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview',
    };

    // 1.3 创建裁剪区域
    $image.cropper(options);
    // 点击上传按钮
    $("#chooseBtn").click(function () {
        // 模拟点击了文件域
        $('[type=file]').click();
    })


    // 给文件域注册change事件 ==> 当文件域发生改变的时候来触发该事件 ==> 更换下裁剪区域的图片
    $("#file").change(function () {
        // console.log("文件域发生改变了");
        // 1. 获取到我们选择的图片 ==> 通过文件域DOM对象的files的属性
        let file = this.files[0];

        // 2. 把我们选择的图片处理成一个url地址
        var newImgURL = URL.createObjectURL(file);

        $image
            .cropper('destroy')
            .attr('src', newImgURL)
            .cropper(options);
    })


    // 确认按钮注册click ==> 发送ajax提交裁切的头像
    $("#sureBtn").click(function () {
        let dataURL = $image
            .cropper('getCroppedCanvas', {
                width: 100,
                height: 100,
            })
            .toDataURL('image/png'); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串



        $.ajax({
            url: "/my/update/avatar",
            type: 'POST',
            data: {
                avatar: dataURL,
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新头像失败！');
                }

                layer.msg("更新头像成功！");
                // 调用父页面的getUserInfo();方法来获取最新的头像和昵称
                window.parent.getUserInfo();
            }
        })
    })




})