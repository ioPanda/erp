import {Collection} from 'backbone';
import model from './model';

export default Collection.extend({
	url:'/marketController/findPrediction.do',
	model:model
});