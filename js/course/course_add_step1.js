define(['jquery', 'common', 'header', 'aside', 'nprogress', 'loading', 'template', 'jqueryForm', 'ckeditor'], function ($, common, undefined, undefined, nprogress, undefined, template, undefined, undefined) {
    // 0 .设置课程详细信息左侧导航
    function initAddAside() {
        $('.forwards a').removeClass('active').first().addClass('active');
    }
    //获取查询字符串cs_id
    var csId = common.parseSearch('cs_id');
    //数据的回显
    $.get('/v6/course/basic', {
        cs_id: csId
    }, function (data) {
        if (data.code == 200) {
            $('.steps').html(template('add-step1-tpl', data.result));
            initAddAside();
        }
    })

    //二级联动问题
    // document 不用加引号
    $(document).on('change', '#cg-parent', function () {
        var cgId = $(this).val();
        // console.log(cgId);
        $.get('/v6/category/child', { cg_id: cgId }, function (data) {
            if (data.code == 200) {
                // console.log(11)
                var options = '';
                for (var i = 0, len = data.result.length; i < len; i++) {
                    options += '<option value="' + data.result[i].cg_id + '">' + data.result[i].cg_name + '</option>'
                }
                // console.log(options)
                $('#cg-children').html(options);
                // goNext();
            }

        })
    });

    //初始化表单提价
    
        $('#course-add-step1-form').ajaxForm({
            delegation: true,
            success: function (data) {
                // if (data.code == 200) {
                    console.log('成功了');
                //     location.href = '/html/course/course_add_step2.html?cs_id=' + csId;
                // }
                   data.code == 200 && (location.href = '/html/course/course_add_step2.html?cs_id=' + csId);
            }
        })
    

    nprogress.done();
});
