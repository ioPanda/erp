import {Route} from 'backbone-routing';
import View from './view.js';
import template from './template.hbs';

export default Route.extend({
	initialize(options={}){
		this.container=options.container;
	}
});