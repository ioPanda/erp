import Backbone from 'backbone';
import {Router} from 'backbone-routing';

import stepOne from './stepOne/route';
import stepTwo from './stepTwo/route';
import stepThree from './stepThree/route';
import stepFour from './stepFour/route';
import stepFive from './stepFive/route';

export default Router.extend({
	initialize(options={}){
		this.container=options.container;		
	},

	routes:{
		'game/adsAndOrder/stepOne':'sOne',
		'game/adsAndOrder/stepTwo':'sTwo',
		'game/adsAndOrder/stepThree':'sThree',
		'game/adsAndOrder/stepFour':'sFour',
		'game/adsAndOrder/stepFive':'sFive'
	},

	sOne () {
		return new stepOne({
			container:this.container
		});
	},

	sTwo () {
		return new stepTwo({
			container:this.container
		});
	},

	sThree () {
		return new stepThree({
			container:this.container
		});
	},

	sFour () {
		return new stepFour({
			container:this.container
		});
	},

	sFive () {
		return new stepFive({
			container:this.container
		});
	}
});