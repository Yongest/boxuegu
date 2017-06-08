define(['jquery'], function ($) {
    'use strict';

    // 登出功能:调用接口,而不是直接删除客户端的cookie
    $('#logout').on('click', function () {
        $.post('/v6/logout', function (data) {
            data.code==200&&(location.href='/html/home/login.html');
        })
    })

});