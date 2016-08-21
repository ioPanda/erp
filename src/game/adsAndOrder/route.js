import {Route} from 'backbone-routing';
import BreadcrumbView from '../../component/breadcrumb/view';
import LayoutView from './layout-view';
import NavView from './nav/view.js';
import Router from './router.js';

export default Route.extend({
	initialize(options={}){
		this.container=options.container;

		this.layout=new LayoutView();
        this.router= new Router();
		this.container.show(this.layout);

        this.layout.breadcrumb.show(new BreadcrumbView({
			'mainNav':'市场管理',
			'title':'广告投放&订单',
			'subTitle':'Advertisement And Order',
			'icon':'glyphicon-map-marker'
		}));	

        this.layout.nav.show(new NavView());
        
        // this.layout.step.show(new Router({container:this.layout.step}));
        

	}

});