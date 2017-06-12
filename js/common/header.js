define(['jquery','util'], function ($,util) {
    'use strict';
    //面向对象一
    // function Header(options){
    //     this.logoutBtn = $(options.logoutSelector) || '#logout';
    //     this.logoutApi = options.logoutApi || '/v6/logout';
    //     this.logoutMethod = options.logoutMethod || 'post';
    //     this.logoutGo = options.logoutGo || '/html/home/login.html';
    // }
    // Header.prototype = {
    //     logout:function(){
    //         var self = this;
    //         this.logoutBtn.on('click',function(){
    //              $[this.logoutMethod](this.logoutApi,function(data){
    //                 data.code==200&&(location.href=self.logoutGo);
    //              })
    //         })
    //     }
    // };
    // return Header;

    // 面向对象二
    function Header(options) {
        // 把默认的对象放一个对象里面,好管理.现在主流的写法
        // 关键字不能作为变量,但是可以作为属性使用this.default
        var _default = {
            logoutSelector: '#logout',
            logoutApi: '/v6/logout',
            logoutMethod: 'post',
            logoutGo: '/html/home/login.html'
        };
        // 合并用户传入的配置,得到最终的配置
        util.extend(_default,options);
        //把合并后最终的的参数添加到this身上
        this.logoutBtn = $(_default.logoutSelector);
        this.logoutApi = _default.logoutApi;
        this.logoutMethod = _default.logoutMethod;
        this.logoutGo = _default.logoutGo;
    }
    Header.prototype = {
        logout: function () {
            var self = this;
            this.logoutBtn.on('click', function () {
                $[self.logoutMethod](self.logoutApi, function (data) {
                    data.code == 200 && (location.href = self.logoutGo);
                })
            })
        }
    };
    return Header;

    // 普通的写法三

    // 登出功能:调用接口,而不是直接删除客户端的cookie
    // $('#logout').on('click', function () {
    //     $.post('/v6/logout', function (data) {
    //         data.code==200&&(location.href='/html/home/login.html');
    //     })
    // })

});