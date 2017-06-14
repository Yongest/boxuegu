define(['jquery', 'common', 'header', 'aside', 'nprogress', 'loading', 'template', 'jqueryForm'], function ($, common, undefined, undefined, nprogress, undefined, template, undefined) {
    
    $('#course-create-form').ajaxForm(function (data) {
        //使页面跳转到course_add_step1.html
        (data.code == 200) && (location.href = '/html/course/course_add_step1.html'+'?cs_id='+data.result.cs_id);
    })

    nprogress.done();
});
