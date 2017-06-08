
//common, 把一些公共的脚本逻辑放在这个js里面.因为每个页面都用的到
/**
 * 判断用户有没有登录过,
 * 若有登录过,访问其他页面就在其他页面,不然返回到登录页面
 */

// "PHPSESSID=j8ngngaksskv8nmmfutr2uh3l5"   //这是登录后边,服务器返回给客户端的cookie信息.代表登录过,下次客户端访问服务器的时候,在请求头中会把
//这条cookie信息返回给服务器



// jqueryCookie是define定义的,依赖于jquery,下面define()中的jquery可以省略,
//像bootstrap是非define定义的,需要shim配置.
define(['jquery','jqueryCookie'],function($,undefined){

    // 方法一:原生js
    // var cookie = document.cookie.split('; ');
    // //利用中间变量
    // var isLogin = false;
    // for(var i = 0,len=cookie.length;i<len;i++){
    //     //存在怎么登录过
    //     if(cookie[i].indexOf('PHPSESSID=')===0){
    //         isLogin = true;
    //         //存在了,则结束循环,不能用return,因为return后面的代码都不会执行了.
    //         break;
    //     }
    // }
    // //若没有登录过,则返回登录页面.
    // //右边是赋值,要用括号包裹起来.
    // !isLogin && (location.href = 'http://boxuegu.com/html/home/login.html' )

    // 方法二:利用jquery-cookie
    if(!$.cookie('PHPSESSID')){
        location.href = 'http://boxuegu.com/html/home/login.html';
    }

});