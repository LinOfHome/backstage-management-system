// ajax的配置 ==> 优化根路径 ==> $.ajaxPrefilter()
$.ajaxPrefilter(function (options) {
    // console.log(options); //"/my/userinfo"
    options.url = "http://ajax.frontend.itheima.net" + options.url;
    // console.log(options); //"http://ajax.frontend.itheima.net/my/userinfo"


    // 处理headers请求头 带上token
    options.headers = {
        // token 的值存储在本地存储中，需要从本地存储中来获取到
        // Authorization 这个不是随便写的，后端定义要求的
        Authorization: localStorage.getItem('token')
    }
})