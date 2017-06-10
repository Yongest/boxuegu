define(['jquery','common','header','aside','nprogress','loading','template','jqueryForm','datepicker','datepickerCN'], function($,undefined,undefined,undefined,nprogress,undefined,template,undefined,undefined,undefined) {
    //个人中心数据回显
	$.get('/v6/teacher/profile',function(data){
        if(data.code==200){
            $('#settings-item').html(template('settings-form-tpl'),data);
            //模板渲染之后再调用方法
            $('.datepicker-input').datepicker({
                language:'zh-CN',
                endDate:new Date(),
                format:'yyyy-mm-dd'
            })
            modify();
        }
    });

    // 个人中心数据提交
    function modify(){
        $('#settings-form').ajaxForm(function(){
        location.reload();
    })
    }
    nprogress.done();
});
