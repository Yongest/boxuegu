define(['jquery','common','header','aside','nprogress','loading','template','jqueryForm','datepicker','datepickerCN','ckeditor','jqueryRegion'], function($,undefined,undefined,undefined,nprogress,undefined,template,undefined,undefined,undefined,ckeditor,undefined) {
    
    var edit=null;//全局变量.ckeditor 的实例.
    //个人中心数据回显
	$.get('/v6/teacher/profile',function(data){
        if(data.code==200){
            $('#settings-item').html(template('settings-form-tpl'),data);
            //模板渲染之后再调用方法
            modify();
            $('.datepicker-input').datepicker({
                language:'zh-CN',
                endDate:new Date(),
                format:'yyyy-mm-dd'
            });
            edit = ckeditor.replace('ckeditor',{
                toolbarGroups:{//配置文件
                    name:'styles'
                }
            });
            $('#region').region({
                url:'/lib/jquery-region/region.json'
            })
        }
    });

    // 个人中心数据提交
    // function modify(){
    //     $('#settings-form').ajaxForm(function(){
    //     location.reload();
    // })
    // }

// 在表单提交之前,需要更新一下文本域
    function modify(){
         $('#settings-form').on('submit',function(){
            //  数据发送前调用一下这个方法,把富文本里面的值传给文本域
             edit.updateElement();
            $(this).ajaxSubmit({
                // 需要在表单提交时,额外增加一个tc_hometown的值
                data:{
                    tc_hometown:$('#p').find('option:seledted')+'|'+$('#c').find('option:seledted')+'|'+$('#d').find('option:seledted')
                },
                success:function(data){
                    if(data.code==200){
                        location.reload();
                    }
                }
            })
            // 阻止表单默认行为,自动刷新
            return false;
         })
    }

    nprogress.done();
});
