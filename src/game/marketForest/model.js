import {Model} from 'backbone';

export default Model.extend({
	url:'/marketController/findPrediction.do',

	default:{
		"marketName":"xxxx",
		"mountMap":{
			"mountMax":"2",
			"mountMin":"1"
		},
		"priceMap":{
			"mountMax":"3",
			"mountMin":"2"
		}
	}
});