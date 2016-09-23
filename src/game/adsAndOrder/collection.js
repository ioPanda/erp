import {Collection} from 'backbone';
import Model from './model';

export default Collection.extend({
	url:'/erp/advertisement/getAdByMarket.do',
	model:Model
});