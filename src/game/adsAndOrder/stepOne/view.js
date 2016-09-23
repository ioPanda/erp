import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'lodash';
import Util from '../../../util.js';
import alertView from '../../../component/modal/service';

export default ItemView.extend({
	template:template,
	className:'stepOne',
	initialize(options={}){
		this.step = options.step;
		this.collection = options.collection;
		Backbone.trigger('Step',this.step);
         this.model = [];
	},

	ui:{
		sure:'.sure',
		findButton:'.findButton'
	},

    events:{
    	"click @ui.sure":"putIntoMoney",
    	"click @ui.findButton":"find"
    },

    changeRender () {
        this.render();
    },

    serializeData () {
        return  { 
            "market": _.invoke(this.collection,'toJSON'),
            "products": this.model
        }
    },

    find (e) {
    	let $this = $(e.target),
    		$select = $this.prev().find('option:selected').val();
    	Util.ajax('POST','/erp/advertisement/getAdByMarket.do',{"marketName":$select})
    		.then((res) => {
                if(res.status == 1){
                    this.model = res.data;
                    this.changeRender();
                }else {
                    console.log(res.status);
                }
    		});
    },

    putIntoMoney (e){
    	let $this = $(e.target),
    		money = $this.parent().prev().find('.putInto').val(),
    		productId = $this.parent().prev().prev().prev().text();
        Util.ajax(
            'POST',
            '/erp/advertisement/putIntoAdvertisement.do',
            {
                "advertisementId":productId,
                "money":money
            })
        .then((res) => {
            if(res.status == 1){
                alertView.request('alert',{title:"确认",text:"操作成功"});
            }else{
                alertView.request('alert',{title:"",text:"操作失败"});
            }
        });

    }
     
});