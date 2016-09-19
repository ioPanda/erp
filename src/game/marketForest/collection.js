import {Collection} from 'backbone';
import model from './model';

export default Collection.extend({
	url:'/erp/market/findPrediction.do',
	model:model
});