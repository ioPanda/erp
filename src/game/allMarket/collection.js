import {Collection} from 'backbone';
import Model from './model';

export default Collection.extend({
	url:'/erp/market/getAllMarkets.do',

	model:Model

});