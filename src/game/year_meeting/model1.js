import {Model} from 'backbone';

export default Model.extend({
	url:'/erp/forward/forward.do',
	defaults:{
		data:'0'//0表示破产， 1表示未破产
	}
});