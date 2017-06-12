define(['jquery','common','header','aside','nprogress','loading'], function($,undefined,Header,undefined,nprogress,undefined) {
    // $.ajax({
    //     type:'post',
    //     // url:'http://api.botue.com/v6/login',
    //     url:'/v6/login',
    //     data:{
    //         tc_name:'前端学院',
    //         tc_pass:'123456'
    //     },
    //     success:function(data){
    //         console.log(data);
    //     }

    // })
    
    //退出功能
    new Header().logout;
    nprogress.done();
});
