import {Model} from 'backbone';

export default Model.extend({
	url:'/username.do',
	default:{
		name:'xxxx'
	}
});