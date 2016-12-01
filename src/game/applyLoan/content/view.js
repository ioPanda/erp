import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';
import {Model} from 'backbone';

export default ItemView.extend({
    template: template,
    className: 'apply-content',

    initialize(options={}){
        this.model = new Model(options);
    },
    ui:{
        options:"#option",
        warning:"#long",
        explains:"#explains",
        types:".types",
        kind:"#kind",
        rate:".rate",
        buttontype:".buttontypes",
        applys:"#shen"

    },
    events:{
        "click @ui.buttontype":"buttontypes",
        "click @ui.applys":"Applys"
    },
    buttontypes (e){
            if(kind.options.text == '长期贷款'){
                warning.innerHTML = '当期不能申请长期贷款！';
                explains.innerHTML = '说明：只有年初才能申请长期贷款。企业运营每期进行一次结算收取利息';
                types.innerHTML ='长期贷款';
                rate.innerHTML = '10.0%';
            }
            else if(kind.options.text == '短期贷款'){
                warning.innerHTML = '贷款金额必须在0.0-87.0万之间！贷款期限必须为四年之内';
                explains.innerHTML = '说明：企业归还短期贷款时一次性结算收取利息';
                types.innerHTML = '短期贷款';
                rate.innerHTML = '5.0%';
            }
            else  if(kind.options.text == '高利贷'){
                warning.innerHTML = '贷款金额必须大于0.0万    贷款期限必须为4期之内';
                explains.innerHTML = '说明：企业每期进行一次性结算收取利息';
                types.innerHTML = '高利贷';
                rate.innerHTML = '20.0%';
            }
            
            // console.log('hhh')
            
        },
    Applys (e){
        $.ajax({
            type:"GET",
            url:" 172.22.4.23:8080/erpm/loan/applyLoan.do",
            async:true,
            data:"{'loanMoney','loanTime','loanType'}",
            contentType: "application/jsonp; charset=utf-8",
            dataType:'jsonp',
            success:function(data){
                alert("hhh");
            }
        })
        
    }
    

    });
   



