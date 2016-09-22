import $ from 'jquery';

export default function CreateAjax(confirmText, dataName, da, index, url){
   this.confirmText = confirmText;
   this.id = id;
   this.index = index;
   this.url = url;
}

CreateAjax.prototype.remove = function(){	
    let agreeId = $(e.target).parent().parent().children().eq(1).html();
    let index;
 
    let jqXHR = $.ajax({
      type: 'GET',
      url: '/erp/userManager/passRegisterUser.do?userId='+agreeId
    });

    jqXHR.done(function(response){
        ModalService.request('alert', {
          title : '',
          text: response.message
        });
        if(response.status === 1){
          for(let i=0;i<$('tbody tr').length;i++) {  
            $('tbody tr').eq(i).children().eq(1).html() === agreeId ? index = i :'';       
          }
          $('tbody').get(0).deleteRow(index);
          console.log('删除了：'+ index);
        }
    });
    jqXHR.fail(function(response){
       ModalService.request('alert', {
          title : '',
          text: '请求连接失败！'
       });
    });
     
   
};