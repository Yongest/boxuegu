define(['jqueryCookie','jquery','common','header','aside','nprogress','loading','template','jqueryForm','datepicker','datepickerCN','ckeditor','jqueryRegion','uploadify'], function(undefined,$,undefined,undefined,undefined,nprogress,undefined,template,undefined,undefined,undefined,ckeditor,undefined,undefined) {
    
    var edit=null;//全局变量.ckeditor 的实例.
    //个人中心数据回显
	$.get('/v6/teacher/profile',function(data){
        if(data.code==200){
            $('#settings-item').html(template('settings-form-tpl',data.result));
            //模板渲染之后再调用方法
            modify();
            //日期选择器功能
            $('.datepicker-input').datepicker({
                language:'zh-CN',
                endDate:new Date(),
                format:'yyyy-mm-dd'
            });
            //富文本编辑功能
            edit = ckeditor.replace('ckeditor',{
                toolbarGroups:[//配置文件
                    { name: 'styles' }
                ]
            });
            // 省,市,县三级联动功能
            $('#region').region({
                url:'/lib/jquery-region/region.json'
            });
            //文件上传功能.
            $('#upfile').uploadify({
                swf:'/lib/uploadify/uploadify.swf',
                uploader:'/v6/uploader/avatar',
                fileObjName:'tc_avatar',
                buttonText:'<i></i>',
                height:$('.preview').height(),
                onUploadSuccess:function(file,data,response){
                    try {
						data = JSON.parse(data);
					}catch(e) {
						data = {};
					}
                    // 图片上传成功后，更新页面头像，同时更新本地cookie记录
                    if(data.code==200){

                        $('.preview img').attr('src',data.result.path);
                        $('.img-circle img').attr('src',data.result.path)
                          /*
						 * 1、获取userInfo这个cookie字符串值
						 * 2、解析为对象
						 * 3、设置对象的tc_avatar值为新的地址
						 * 4、把对象转换为字符串保存到cookie中
						 * */
                        var userInfoObj = JSON.parse($.cookie('userInfo') || '{}');
						userInfoObj.tc_avatar = data.result.path;
						$.cookie('userInfo', JSON.stringify(userInfoObj), { path: '/' });
                    }
            
                }
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
         });
    }

    nprogress.done();
});
