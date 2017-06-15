// 其中下面的undefined代表一个占位符,表示木有返回值.而jqueryCookie所有的方法不是在jquery原型上就是在其自己上面
define(['jquery','jqueryCookie','nprogress','loading'], function ($,undefined,nprogress,undefined) {

//更改登录的图像
var loginAvatarObj = JSON.parse($.cookie('userInfo')||'{}').tc_avatar;
// var loginAvatarStr = JSON.stringify(loginAvatarObj);
$('.avatar img').attr('src',loginAvatarObj);

//登录校验
(function(){
	 if($.cookie('PHPSESSID')){
        location.href = '/';
    }
})();

//表单校验,一个自调函数代表一个功能
	(function () {
		// 监听表单提交事件，并阻止，转而变成ajax请求
		$('#login-form').on('submit', function () {
			// 这里的this是form原生对象，对form进行包装，才可以调用jq的法方法
			// console.log($(this).serialize());//需要表单中有name属性,不然打印出来的是空值
			// console.log($(this).serializeArray());
			// 发送ajax请求，页面不用刷新
			$.ajax({
				url: '/v6/login',
				type: 'POST',
				data: $(this).serialize(),
				// 请求成功跳转到首页
				success: function (data) {
					if (data.code == 200) {
						//保存登录成功得到的头像以及用户名
						$.cookie('userInfo',JSON.stringify(data.result),{path:'/'})
						location.href = '/';
					}
				},
				// 请求失败给出错误提示
				error: function () {
					alert(arguments[2]);
				}
			});
			// 阻止表单默认的提交，防止页面刷新跳转
			return false;
		});
	})();


	nprogress.done();

});
