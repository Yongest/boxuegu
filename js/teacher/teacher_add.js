define(['aside', 'header', 'nprogress', 'jquery', 'loading','template','jqueryForm'], function(undefined, undefined, nprogress, $, undefined,template,undefined) {
    /**
     * 这里的js作用于两个页面,一个是添加讲师页面,一个是编辑讲师页面
     * 1.获取页面查询字符串
     * 2.然后判断里面有没有tc_id参数,如果有则认为是编辑,没有认为是添加.
     * 3.根据判断结果,执行对应的代码
     */
    /**
     * 查询字符串中指定的值
     * 1.先去掉字符串中的?号,提取成一个对象
     * 2.使用$符号劈开这个字符串,得到一个数组,里面储存每一个单独的字符串.
     * 3.遍历数组,每一个单独字符串继续使用=劈开,提取每一个查询字符串的key与value.
     * 4.把这些查询字符串的key与value存储到一个对象里面去,方便使用.
     */
     var urlSearch = location.search.slice(1);//包头不包尾
     var urlSearchArr = urlSearch.split('&');
     var urlSearchObj = {},temp;
     for(var i =0,len=urlSearchArr.length;i<len;i++){
        temp = urlSearchArr[i].split('=');
        urlSearch[temp[0]]=temp[1];
     }
    //  判断参数中有没有tc_id,
    if(urlSearchObj.hasOwnProperty('tc_id')){
        teacherEdit();
    }else {
        teacherAdd();
    }
	//添加讲师功能
    function teacherAdd(){
        //把模板添加到坑中,因为是添加,只要传入一个空对象就可以,又因为是动态生成的表单,所有用事件委托的方式.
         $('.teacher').html(template('teacher-add-edit-tpl',{}));
        // $(document).on('submit','#teacher-add-edit',function(){
        //     $.post('/v6/teacher/add',$(this).serialize(),function(data){
        //          location.href = '/html/teacher/teacher_list.html';
        //     })
        //     return false;
        // })

        // 利用jqueryForm插件来提交表单
        $('#teacher-add-edit').ajaxForm(function(){
            location.href = '/html/teacher/teacher_list.html';
        })
    }
    //编辑讲师功能
    function teacherEdit(){
        // 数据的回显
        $.get('/v6/teacher/edit',{tc_id:urlSearchObj.tc_id},function(data){
            $('.teacher').html(template('teacher-add-edit-tpl',data.result))
        })
        // 数据的提交,因为表单是动态生成的,所有使用委托的方式
        $(document).on('submit','#teacher-add-edit',function(){
            $.post('/v6/teacher/update',$(this).serialize(),function(data){
                 location.href = '/html/teacher/teacher_list.html';
            })
            return false;
        })
    }
    nprogress.done();
});
