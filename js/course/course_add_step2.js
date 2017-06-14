define(['jquery', 'common', 'header', 'aside', 'nprogress', 'loading', 'template', 'jqueryForm', 'ckeditor', 'uploadify'], function ($, common, undefined, undefined, nprogress, undefined, template, undefined, undefined, undefined) {

    function initAddAside() {
        $('.forwards a').removeClass('active').first().next().addClass('active');
    }
    var csId = common.parseSearch('cs_id');
    $.get('/v6/course/picture', { cs_id: csId }, function (data) {
        (data.code == 200) && ($('.steps').html(template('add-step2-tpl', data.result))) && (initAddAside());
        // 文件上传功能放在这里面
        uploadFile();
    })


    //文件上传功能,需要等待参数传递回来,页面渲染完毕之后,才能执行
    function uploadFile() {
        $('#upfile').uploadify({
            swf: '/lib/uploadify/uploadify.swf',
            uploadify: '/v6/uploader/cover',
            fileObjName: 'cs_cover_original',
            formData: { cs_id: csId },
            buttonClass: 'btn btn-success btn-sm',
            buttonText: '选择图片',
            itemTemplate: '<i><i>',
            height: '100%',
            width: '100%',
            onUploadSuccess: function (file, data, response) {
                //    一般用到JSON.parse()这个方法,都要加上try .. catch...,防止报错
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    data = {};
                }
                if (data.code == 200) {
                    $('.preview img').attr('src', JSON.parse(data.result.path));
                    location.href = ('/html/course/course_add_step3.html?cs_id=' + csId);
                }

            }
        })
    }
    nprogress.done();

});
