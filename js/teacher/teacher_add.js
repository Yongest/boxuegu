define(['aside', 'header', 'nprogress', 'jquery', 'loading'], function(undefined, undefined, nprogress, $, undefined) {
	//添加讲师功能
    (function(){
        $('#teacher-add-edit').on('submit',function(){
            $.post('/v6/teacher/add',$(this).serialize(),function(data){
                // if(data.code ==200){
                    location.href = '/html/teacher/teacher_list.html';
                // }
            })
            return false;
        })
    })();
    


    nprogress.done();
});
