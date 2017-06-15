define(['jquery','common','header','aside','nprogress','loading','template'], function($,undefined,undefined,undefined,nprogress,undefined,template) {
    //定义一个helper函数,这个函数也叫过滤器;
    //使用helper,必须先传入一个过滤器名词,在传入这个过滤器对应的回调函数
    //这个函数可以接收俩个参数,第一个参数为模板中的数据,第二个参数为使用过滤器传入的参数.
    template.helper('random',function(source,param){
        var params = param.split(', ');
        return Math.ceil(Math.random()*(params[1]-params[0])+params[0])
    })
    // 渲染课程列表
    // $('#course-items').append(template('course-list-tpl'),{})
    $.get('/v6/course',function(data){
        if(data.code ==200){
            console.log(111);
            $('#course-items').append(template('course-list-tpl',data))
        }
    })
    
    
    nprogress.done();

});
