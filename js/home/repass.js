define(['jquery','common','header','aside','nprogress','loading','jqueryForm'], function($,undefined,undefined,undefined,nprogress,undefined,undefined) {
    // 修改密码功能,接口与提交方式已经在form表单中写好
	$('#change-pass').ajaxForm(function(data){
        //用js方式触发点击事件,让修改好密码后,跳到登录页面
        if(data.code==200){
            $('#logout').trigger('click');
        }
    })

    nprogress.done();
});
