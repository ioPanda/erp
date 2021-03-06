import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';
import _ from 'lodash';
import Backbone from 'backbone';
import Util from '../../../util.js';

export default ItemView.extend({
	template:template,
    className:'_content',

    initialize(options={}){
    	this.collection=options.collection;
    },
    
    //返回渲染数据
    serializeData () {
    	return {
    		"unDevelopMarket":_.invoke(this.collection, 'toJSON')
    	}
    },

    ui:{
        startRes:'.startRes'
    },

    events:{
        'mouseover @ui.startRes':'moveIn',
        'mouseout @ui.startRes':'moveOut',
        'click @ui.startRes':'todoFun'
    },

    todoFun (e) {
        let $this = $(e.target),
            $parent = $this.parent(),
            marketName = $this.prev().find('.Name').find('h3').text(),
            researchPeriod = $this.prev().find('.period').find('h3').text(),
            researchCost = $this.prev().find('.creatFee').find('h3').text(),
            maintainCost = $this.prev().find('.serFee').find('h3').text();
    
        let model = {"marketName":marketName,
                     "researchPeriod":researchPeriod,
                     "researchCost":researchCost,
                     "finishedPeriod":0,
                     "beginTime":0,
                     "status":1
                    };
        console.log(marketName);
        Util.ajax(
            'POST',
            '/erp/market/startUndevelopMarketToDeveloping.do',
            {"marketName":marketName})
        .then((res) => {
            if(res.status == 1){
                console.log(res.message);
            }else{
                console.log(1);
                console.log(res.message);
            }
        });
        
        $parent.remove();
        Backbone.trigger('append', [model]);
    }

});























