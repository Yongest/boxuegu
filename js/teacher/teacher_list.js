define(['bootstrap', 'aside', 'header', 'nprogress', 'jquery', 'loading', 'template'], function (undefined, undefined, undefined, nprogress, $, undefined, template) {
    //渲染讲师列表
    (function () {
        //1.获取数据
        //2.渲染列表 
        $.get('/v6/teacher', function (data) {
            if (data.code === 200) {
                $('.table-teacher-list').append(template('teacher-list-tpl', data))
            }

        })
    })();

    // 查看讲师列表
    (function () {
        //利用事件委托的方式来给动态元素绑定事件.
        $(document).on('click', '.teacher-vue-id', function () {
            //  $('#teacherModal').append(template('teacher-view-tpl',{}))
            $.get('/v6/teacher/view', {
                tc_id: ($(this).data('teacher-id'))
            }, function (data) {
                if(data.code===200){
                    $('#teacherModal').append(template('teacher-view-tpl',data.result))
                }
            })
        })
    })();

    //讲师注销与开启功能
    (function(){
        $(document).on('click','.teacher-handle',function(){
            var self = this;//为了获得动态生成的元素,在回调里面可以用
            // console.log(self);
            $.post('/v6/teacher/handle',{
                tc_id:$(this).data('teacher-id'),
                tc_status:$(this).data('teacher-status')
            },function(data){
                // console.log(1111); //请求403 禁止状态 ,进入不了回调
                if(data.code==200){
                    if(data.result.tc_status==0){
                        $(self).data('teacher-status',0);//及时更新teacher的状态
                        $(self).html('注销');
                    }else {
                        $(self).data('teacher-status',1);
                        $(self).html('开启');
                    }
                }
            })
        })
    })()
    nprogress.done();
});
