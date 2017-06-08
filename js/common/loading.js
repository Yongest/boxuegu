define(['jquery'],function($){
      //二.jax-loading功能
    (function () {
        $(document).on('ajaxStart',function(){
            $('.overlay').show();
        }).on('ajaxStop',function(){
            $('.overlay').hide();
        })
    })();
})