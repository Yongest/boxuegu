define(['jquery','common','header','aside','nprogress','loading','template','jqueryForm'], function($,common,undefined,undefined,nprogress,undefined,template,undefined) {
	
    //  判断参数中有没有tc_id,
//    console.log(common.parseSearch('id'));
//    console.log(common.parseSearch());

/**
 * 1.search区分是添加还是编辑
 * 2.不同页面功能采取不同的方式获取页面回显数据
 * 2.1添加页面直接给个空对象,但任然需要请求接口获取顶级分类,然后把结果添加到这个空对象中
 * 2.2 编辑页面需要请求接口获取
 * 3.通过模板引擎把数据渲染到页面中
 * 4.通过表单提交插件初始化表单提交功能
 */
    var cg_id = common.parseSearch('tc_id');

    if(cg_id!=null){//排除tc_id为0的情况,即使为0,tc_id也不等于0
        //编辑课程
       $.get('/v6/category/edit',{cg_id:cg_id},function(data){
           if(data.code==200){
                 render(data.result);
           }  
       })
    }else {
        //添加课程
      $.get('/v6/category/top',function(data){
            if(data.code==200){
                //为了使用和编辑相同的模板,所以传入一个对象,
                //用于和编辑一样的数据结构,都有一个top属性存储所有的顶级分类
                render({top:data.result});
            }
      })
    }

    //初始化表单提交功能
    //配置delegation:true,这个功能想当委托,用自调就可以了
   (function initForm(){
        $('#course-form').ajaxForm({
            delegation:true,
            success:function(data){
                if(data.code==200){
                    location.href = '/html/course/course_list.html';
                }
            }
        })
    })();
 
    // 通过传入的数据,渲染页面
    function render (data){
        $('#category_add_edit').html(template('course-category-edit-tpl',data))
    }
     nprogress.done();
});
