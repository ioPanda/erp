/**
 * Created by wangxinyu11 on 2016/6/30.
 */
import $ from 'jquery';

export default {
	save(model) {
		return Promise.resolve(model.save()).then(() => {
			return model;
		})
	},
	commonRoutes(routes) {
		// 
	}
}