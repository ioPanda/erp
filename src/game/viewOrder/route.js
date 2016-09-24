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
            'mainNav': '销售管理',
            'title': '查看订单',
            'subTitle': 'To view the order ',
            'icon' : 'glyphicon-briefcase'
        }));

        // 销售管理
        this.layout.content.show(new ContentView());
    }
});
