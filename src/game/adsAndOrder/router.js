import Backbone from 'backbone';
import {Router} from 'backbone-routing';

import stepFiveRoute from './stepFive/route';
import stepFourRoute from './stepFour/route';
import stepThreeRoute from './stepThree/route';
import stepTwoRoute from './stepTwo/route';
import stepOneRoute from './stepOne/route';

export default Router.extend({
	initialize(options={}){
        this.step = options.step;
	    this.container=options.container;
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
