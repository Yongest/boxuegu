define(['jquery'], function($) {
	
	// 监听表单提交事件，并阻止，转而变成ajax请求
	$('#login-form').on('submit', function() {
		
		// 这里的this是form原生对象，对form进行包装，才可以调用jq的法方法
//		console.log($(this).serialize());
//		console.log($(this).serializeArray());
		
		// 发送ajax请求，页面不用刷新
		$.ajax({
			url: '/v6/login',
			type: 'POST',
			data: $(this).serialize(),
			// 请求成功跳转到首页
			success: function(data) {
				if(data.code == 200) {
					location.href = '/';
				}
			},
			// 请求失败给出错误提示
			error: function() {
				alert(arguments[2]);
			}
		});
		
		// 阻止表单默认的提交，防止页面刷新跳转
		return false;
	});
	
});
