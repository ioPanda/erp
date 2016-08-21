import Backbone from 'backbone';
import {Router} from 'backbone-routing';

import stepFiveRoute from './stepFive/route';
import stepFourRoute from './stepFour/route';
import stepThreeRoute from './stepThree/route';
import stepTwoRoute from './stepTwo/route';
import stepOneRoute from './stepOne/route';

export default Router.extend({
	initialize(options={}){
	    this.container=options.container;
	},
    
    routes:{
        'game/adsAndOrder':'stepOne',
    	'game/adsAndOrder/stepOne':'stepOne',
    	'game/adsAndOrder/stepTwo':'stepTwo',
    	'game/adsAndOrder/stepThree':'stepThree',
    	'game/adsAndOrder/stepFour':'stepFour',
    	'game/adsAndOrder/stepFive':'stepFive'
    },

    stepOne () {
    	return new stepOneRoute({
    		container:this.container
    	});
    },

    stepTwo () {
    	return new stepTwoRoute({
    		container:this.container
    	})
    },

    stepThree () {
    	return new stepThreeRoute({
    		container:this.container
    	});
    },

    stepFour () {
    	return new stepFourRoute({
    		container:this.container
    	});
    },


    stepFive () {
    	return new stepFiveRoute({
    		container:this.container
    	})
    }


}); 
