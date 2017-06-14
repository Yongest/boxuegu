define(['bootstrap','jquery', 'common', 'header', 'aside', 'nprogress', 'loading', 'template', 'jqueryForm', 'ckeditor'], function(undefined,$, common, undefined, undefined, nprogress, undefined, template, undefined, undefined) {
	/**
     * 1.根据cs_id 参数发送ajax请求.
     * 2.填写artTemplate模板信息.根据数据渲染页面.
     * 3.数据回显后,实现页面的添加与编辑.
     * 3.1 点击编辑,弹出模态框,回显数据.
     * 3.2 点击添加按钮,弹出模态框,添加数据.
     */
 function initAddAside() {
        $('.forwards a').removeClass('active').first().last().addClass('active');
    }
     var csId= common.parseSearch('cs_id');
    //数据的回显
    $.get('/v6/course/lesson',{
        csid:csId
    },function(data){
        if(data.code==200){
            $('.steps').html(template('add-step1-tpl',data.result));
            initAddAside();
        }
    })

    //点击编辑回显功能
    $(document).on('click','#edit-step3',function(){
        var ctId = $(this).data('tc-id');
        $.get('/v6/course/chapter/edit',{ct_id:ctId},function(data){
            if(data.code==200){
                $('.edit-modal-content').html(template('modal-content-tpl',data.result));
            }
        })
    })

    //添加课时,弹出空的模态框
      $(document).on('click','#add-course-btn',function(){
        $('.edit-modal-content').html(template('modal-content-tpl',{}));
    })

    //数据回写完毕后,添加或者编辑功能

    $(document).on('click','#course-add-edit-btn',function(){
        // 一般获取表单的属性都用prop();
        var isChecked = $('.checkbox input').prop('checked');
        $('#add-edit-form').ajaxSubmit({
            data:{
                ct_is_free : isChecked? 1:0,
                cs_id : csId
            },
            success:function(data){
                data.code==200 && location.reload();
            }
        })
    })
    nprogress.done()
});
