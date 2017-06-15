define(['jcrop','jquery', 'common', 'header', 'aside', 'nprogress', 'loading', 'template', 'jqueryForm', 'ckeditor', 'uploadify'], function (undefined,$, common, undefined, undefined, nprogress, undefined, template, undefined, undefined, undefined) {

    function initAddAside() {
        $('.forwards a').removeClass('active').eq(1).addClass('active');
    }
    var csId = common.parseSearch('cs_id');
    $.get('/v6/course/picture', { cs_id: csId }, function (data) {
        (data.code == 200) && ($('.steps').html(template('add-step2-tpl', data.result))) && (initAddAside());
         initAddAside();
         // 文件上传功能放在这里面
        uploadFile();
    })


    //文件上传功能,需要等待参数传递回来,页面渲染完毕之后,才能执行
    function uploadFile() {
        $('#upfile').uploadify({
            swf: '/lib/uploadify/uploadify.swf',
            uploader: '/v6/uploader/cover',
            fileObjName: 'cs_cover_original',
            formData: { 'cs_id': csId },
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
                    $('.preview img').attr('src', data.result.path);
                    // console.log(111)
                    // 下面的的右边不能括号
                    // location.href = ('/html/course/course_add_step3.html?cs_id=' + csId);
                    // 下面的才是正确的
                    // location.href = '/html/course/course_add_step3.html?cs_id=' + csId;
                }

            }
        })
    }

    //z这个插件,默认会按图片原来的大小初始化插件
    var clipResult ={};
    $(document).on('click','#clip-btn',function(){
        var $self = $(this)
        //如果是裁切图片,那么初始化这个插件
        if($self.text()==='裁切图片'){
            $('.preview img').Jcrop({
                aspectRatio:2,
                setSelect:[0,0,100,100],
                boxHeight:400,
                boxWidth:400
            },function(){
                // 通过实例.container可以获取这个插件的父容器,父容器可以监听这个插件提供的一些事件
                this.container.on('cropend',function(e,s,c){
                    // console.log(c.x,c.y,c.w,c.h);
                    // 剪切结束后,把结果保存到一个外界变量
                    clipResult = c;
                })

                $self.text('保存') ;
            })
        }else {
            $.ajax({
                type:'post',
                url:'/v6/course/update/picture',
                data:{
                    cs_id :csId, 
                    x:clipResult.x,
                    y:clipResult.y,
                    w:clipResult.w,
                    h:clipResult.h,
                },
                success:function(data){
                    data.code==200 &&  (location.href = '/html/course/course_add_step3.html?cs_id=' + csId);
                }
            })
        }
    })
    
    nprogress.done();

});
