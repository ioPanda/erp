import {Collection} from 'backbone';
import Model from './model';

export default Collection.extend({
	model:Model,
	url:'/erp/advertisementController/getAlreadAd.do'
});