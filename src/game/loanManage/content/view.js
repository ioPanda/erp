import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';
import {Model} from 'backbone';

export default ItemView.extend({
    template: template,
    className: 'loanM_content',

    initialize(options={}){
       this.model = options.model;
    },
    ui:{
    	buttontype:'#buttontype',
    	html:'',
    	result:'eval(data)',
    	length:'result.length>2?2:result.length',
    	data:'eval('(' + responseText + ')')',
    	tab:'table'
    },
    event:{
    	"click @ui.buttontype":"chckes"
    },
    reqFun () {
        Util.ajax('GET','/erp/loan/findLongLoanEndInOneYear.do',{' loanID':'贷款编号','loanTypeName':'贷款类型',' beginTime':'开始贷款时间',' endTime':'最后还款时间',' money':'贷款金额',' status':'处理'})
            .then((res) => {
                if(res.status == 1){
                    this.model = res.data;
                    this.changeRender();
                }else {
                    console.log(res.status);
                    throw new error("error!");
                }
            });
    },
    chckes(e){
    	$.ajax({
    		type:'get',
    		url:'/erp/loan/findLongLoanEndInOneYear.do',
    		data: "{' loanID','loanTypeName',' beginTime',' endTime',' money',' status'}",
    		success: function(data){
    			html=[];
    			if(data.length > 0){
    			  let trBgColor = '#FFFFFF';
    			    for(let i=0;i<data.length;i++){
    			    if(i%2 == 0){endTime
    			     trBgColor = "#FFFFFF";
    			    }
    			    else{
    			    trBgColor = '#F4F4F4';
    			    }
    			    
    			    let plan = data[i];
    			    
    			    html.push("<tr align='center' valign='middle' bordercolor='#0000FF' bgcolor='"+ trBgColor +"' id='childPlan'"+  list +">");
    			    
    			    html.push("<td>"+ plan.loanID +"</td>");
    			    
    			    html.push("<td>"+ plan.loanTypeName +"</td>");
    			    
    			    html.push("<td>"+ plan.beginTime+"</td>");
    			    
    			    html.push("<td>"+ plan.endTime +"</td>");
    			    
    			    html.push("<td>"+ plan.status +"</td>");
    			    
    			    html.push("</tr>");
    			    	       }
    			    	   }
    		}
    		 tab.html("");
    	     tab.append(html.join(""));
    	alert(data.d);
    	},
    	error: function(err) {
    	alert(err);
    	}

    	})
    
    // function getHTTPObject(){
    // 	if(typeof XMLHttpRequest === "undefined"){
    // 		XMLHttpRequest = function(){
    // 			try{return new
    // 				ActiveXObject("Msxml2.XMLHTTP6.0");
    // 			}
    // 			catch(e){}
    // 			try{return new
    // 				ActiveXObject("Msxml2.XMLHTTP3.0");
    // 			}
    // 			catch(e){}
    // 			try{return new
    // 				ActiveXObject("Msxml2.XMLHTTP");
    // 			}
    // 			catch(e){}
    // 			return false;

    // 		}
    // 	}
    // 	return new XMLHttpRequest();
    // }
    
  //  chckes(e){
  //   	$.ajax({
  //   	type: "Get",
  //   	url: " /erp/loan/findLongLoanEndInOneYear.do",
  //   	async: true,
    	
  //   	data: "{' loanID','loanTypeName',' beginTime',' endTime',' money',' status'}",
  //   	contentType: "application/json; charset=utf-8",
  //   	dataType: "json",
  //   	success: function(data) {
  //   	//返回的数据用data.d获取内容
  //   	let html = '';              
  //   	let result = eval(data);
  //   	let length = result.length>2?2:result.length;
  //   	let data = eval('(' + responseText + ')');
  //   	   let tab = $("table");
  //   	   let html = [];
  //   	   if(data.length > 0){
  //   	       let trBgColor = '#FFFFFF';
  //   	       for(let i=0;i<data.length;i++){
  //   	           if(i%2 == 0){endTime
  //   	             trBgColor = "#FFFFFF";
  //   	           }else{
  //   	             trBgColor = '#F4F4F4';
  //   	           }
  //   	           let plan = data[i];
  //   	           html.push("<tr align='center' valign='middle' bordercolor='#0000FF' bgcolor='"+ trBgColor +"' id='childPlan'"+  list +">");
  //   	           html.push("<td>"+ plan.loanID +"</td>");
  //   	           html.push("<td>"+ plan.loanTypeName +"</td>");
  //   	           html.push("<td>"+ plan.beginTime+"</td>");
  //   	           html.push("<td>"+ plan.endTime +"</td>");
  //   	           html.push("<td>"+ plan.status +"</td>");
  //   	           html.push("</tr>");
  //   	       }
  //   	   }
  //   	   tab.html("");
  //   	   tab.append(html.join(""));
  //   	alert(data.d);
  //   	},
  //   	error: function(err) {
  //   	alert(err);
  //   	}
  //   	})
		// }
    })
    