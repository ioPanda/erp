import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';
import {Model} from 'backbone';
import houseBuild from '../../../component/popUp/houseBuild/view.js';

export default ItemView.extend({
    template: template,
    className: 'status',
    
    initialize(options={}){
        this.model = new Model(options);
    },

    ui: {
        btnInquire: '.btnInquire',
        // houseBuild: '.build',
        // houseRent: 'rent'
    },

    events:{
        'mouseover @ui.btnInquire': 'moveIn',
        'mouseout @ui.btnInquire': 'moveOut'
        // 'click @ui.houseBuild':'popBuild',
        // 'click @ui.houseRent':'popRent'
    },

    moveIn (e) {
        let $this = $(e.target);
        $this.find('.btn-hover').css('display', 'block');
    },

    moveOut (e) {
        let $this=$(e.target);
        $this.find('.btn-hover').css('display', 'none');  
    }

    // popBuild (e) {
    //     this.layout = new houseBuild();
    // },

    // popRent (e) {

    // }
});
