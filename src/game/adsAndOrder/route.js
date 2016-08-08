import {Route} from 'backbone-routing';
import LayoutView from './layout-view';
import BreadcrumbView from '../../component/breadcrumb/view';
import ContentView from './content/view';

export default Route.extend({
    initialize(options = {}) {
        this.container = options.container;

        this.layout = new LayoutView();
        this.container.show(this.layout);

        // 面包屑
        this.layout.breadcrumb.show(new BreadcrumbView({
        	'mainNav': '市场管理',
        	'title': '广告投放和订单',
        	'subTitle': 'Advertisement and Order',
            'icon':'glyphicon-map-marker'
        }));

        // 年度会议规划部分
        this.layout.content.show(new ContentView());
    }
});
