import {Route} from 'backbone-routing';
import View from './view.js';

export default Route.extend({
	initialize(options={}){
		this.container=options.container;
	}
});