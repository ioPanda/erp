import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';
import {Model} from 'backbone';

export default ItemView.extend({
    template: template,
    className: 'loan-content',
    
    initialize(options={}){
        this.model = new Model(options);
    },

    // ui: {
    //     btnInquire: '.btnInquire'
    // }
});
