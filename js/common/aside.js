define(['jquery','jqueryCookie','template'],function($,undefined,template){
    //用户信息展示
   (function(){
         // 个人图像及用户名功能
    // 1.获取保存在cookie的图片及用户名,转化为js对象
    // 2.制定字符串模板
    // 3.调用字符串模板里面的compile方法,得到一个渲染函数
    // 4.调用渲染函数得到完整的html代码
    // 5.把html代码追加到aside.html中

    var userInfoStr = $.cookie('userInfo');
    var userInfoObj;
    //防止报错的写法,当userInforStr的格式有问题就会报错
    try {
         userInfoObj= JSON.parse(userInfoStr)
    }catch (e){
        userInfoObj = {};
    }
    // console.log(userInfo);
    var profile ='<div class="profile">' +
            '<div class="avatar img-circle">'+
                '<img src="{{tc_avatar?tc_avatar:"/img/default.png"}}">'+
            '</div>'+
           ' <h4>{{tc_name?tc_name:"yonger"}}</h4>'+
       ' </div>';
    var userRender = template.compile(profile);
    var newHtml = userRender(userInfoObj);
    // console.log(newHtml);
    $('.aside').prepend(newHtml)
   })();

   //导航栏下拉列表
   (function(){
        $('.navSlide').on('click',function(){
            $(this).next().slideToggle();
        })
   })();

   //导航栏获取焦点
   (function(){
       //1.获取页面的路径;
        //2.去除所有a标签的active.
        //3给相应路径下的a标签添加active.
    //     var pathName = location.pathname;
    //    $('.navs a').removeClass('active').filter('[href="'+pathName+'"]').addClass('active');

/**
 * 还有一些页面或者隐藏比较深的页面,这些页面在导航左侧没有对应的列表
 * 那么我们可以手动的添加一些配置,单独指定那些页面对应的那个a标签.
 * 1.把所有页面的路径与对应的左侧列表href使用key,value的方法映射
 * 2.获取当前页面的路径
 * 3.使用这个路径去对应的配置中查找
 * 3.1若果找到,那么就使用这个路径对应的a标签
 * 3.2 若没有找到,那么就直接使用这个路径去找对应的a标签
 * 4.移除使用a标签的active类名.
 * 5.获取页面对应的a标签,给他单独添加active类名
 */

    var pathHref = {
       '/html/teacher/teacher_add.html': '/html/teacher/teacher_list.html',
       '/html/user/user_profile.html':'/html/user/user_list.html'
    }
    var pathName = location.pathname;
    var aHref = pathHref[pathName]?pathHref[pathName]:pathName;
    $('.navs a').removeClass('active').filter('[href="'+aHref+'"]').addClass('active');
   })();
});