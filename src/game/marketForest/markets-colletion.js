import {Collection} from 'backbone';
import Model from './markets-model';

export default Collection.extend({
	url:'/erp/market/getDevelopedMarket.do',
	model:Model
});