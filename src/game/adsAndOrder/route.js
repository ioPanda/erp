import {Route} from 'backbone-routing';
import BreadcrumbView from '../../component/breadcrumb/view';
import 
import LayoutView from './layout-view';


export default Route.extend({
	initialize(options={}){
		this.container=options.container;

		this.layout=new LayoutView();
		this.container.show(this.layout);

		this.layout.breadcrumb.show(new BreadcrumbView({
			'mainNav':'市场管理',
			'title':'广告投放&订单',
			'subTitle':'Advertisement and order',
			'icon':'glyphicon-map-marker'
		}));

		this.layout.navStep = new 

		this.layout.step.show();

		this.layout.talkRoom.show();
	},

});