import {Route} from 'backbone-routing';
import LayoutView from './layout-view';
import BreadcrumbView from '../../component/breadcrumb/view';
import ContentView from './content/view';

export default Route.extend({
    initialize(options = {}) {
        this.container = options.container;

        this.layout = new LayoutView();
        this.container.show(this.layout);
        
        this.layout.breadcrumb.show(new BreadcrumbView({
            'mainNav': '销售管理',
            'title': '按订单发货',
            'subTitle': 'According to the order of delivery ',
            'icon' : 'glyphicon-briefcase'
        }));

        // 销售管理
        this.layout.content.show(new ContentView());
    }
});



