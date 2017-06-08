define(['aside','header','nprogress','jquery','loading','template'], function(undefined,undefined,nprogress,$,undefined,template) {
	//渲染讲师列表
    (function(){
        //1.获取数据
        //2.渲染列表 
         $.get('/v6/teacher',function(data){
             if(data.code===200){
                 $('.table-teacher-list').append(template('teacher-list-tpl',data))
             }
           
        })
    })();

    nprogress.done();
});
