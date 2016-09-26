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
    	buttontype:'.buttontype'
    },
    events:{
    	'click @ui.buttontype':'buttontypeFun'
    },
    //var iable=new XMLHttpRequest();
    buttontypeFun (e){
    	let $this = $(e.target),
    	    $text = $this.text(),
    	    $option = $this.prev().find('select').find('option').text(),
    	    option = $option.text(),
    	    $warning = &this.prev().find('.explain')find('#long'),
    	    warning = $warning.text(),
    	    $shuo = &this.prev().find('.explain')find('#explains'),
    	    shuo = $shuo.text()
    	    console.log(shuo);
    	    console.log(warning);
    	if($this.option == '长期贷款'){

    		$warning.text('当期不能申请长期贷款！');
    		$shuo.text('说明：只有年初才能申请长期贷款。企业运营每期进行一次结算收取利息');
    		ajax('get','/isAllowLoan.do',{"warning":warning},{"shuo":shuo})
    			.then((res) => {
    				if (res.option == 1) {
    					console.log(res.message);	
    				}else{
    					console.log(res.message);
    				}
    			});
    	}
    	if($this.option == '短期贷款'){
    		$warning.text('贷款金额必须在0.0-87.0万之间！贷款期限必须为四年之内');
    		$shuo.text('说明：企业归还短期贷款时一次性结算收取利息')
    		ajax('get','/isAllowLoan.do',{"warning":warning},{"shuo":shuo})
    			.then((res) => {
    				if (res.option == 1) {
    					console.log(res.message);	
    				}else{
    					console.log(res.message);
    				}
    			});
    	}
    	if($this.option == '高利贷'){
    		$warning.text('贷款金额必须大于0.0万    贷款期限必须为4期之内');
    		$shuo.text('说明：企业每期进行一次性结算收取利息')
    		ajax('get','/isAllowLoan.do',{"warning":warning},{"shuo":shuo})
    			.then((res) => {
    				if (res.option == 1) {
    					console.log(res.message);	
    				}else{
    					console.log(res.message);
    				}
    			});
    	}

    }
});


