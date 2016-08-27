import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';
import {Model} from 'backbone';

export default ItemView.extend({
    template: template,
    className: 'status',
    
    initialize(options={}){
        this.model = new Model(options);
    },

    ui: {
        btnInquire: '.btnInquire'
    },

    events:{
        'mouseover @ui.btnInquire':'moveIn',
        'mouseout @ui.btnInquire':'moveOut'
    },

    moveIn (e) {
        let $this = $(e.target);
        $this.children().css('display', 'block');
    },

    moveOut (e) {
        let $this=$(e.target);
        $this.children().css('display', 'none');  
    }
});
