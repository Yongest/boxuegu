define(['jquery','common','header','aside','nprogress','loading','template'], function($,undefined,undefined,undefined,nprogress,undefined,template) {
    //  $('#course-category-table').append(template('course-category-tpl',{}));
	$.get('/v6/category',function(data){
        if(data.code==200){
            $('#course-category-table').append(template('course-category-tpl',data));
        }
    })
        
    nprogress.done();
});