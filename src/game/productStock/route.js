import {Route} from 'backbone-routing';
import LayoutView from './layout-view';
import BreadcrumbView from '../../component/breadcrumb/view';
import ContentView from './content/view';

export default Route.extend({
    initialize(options = {}) {
        this.container = options.container;

        this.layout = new LayoutView();
    },


    render () {
        this.container.show(this.layout);

        // 面包屑
        this.layout.breadcrumb.show(new BreadcrumbView({
            'mainNav': '库存管理',
            'title': '产品库存',
            'subTitle': 'Product inventory',
            'icon':'glyphicon-th'
        }));

        this.layout.content.show(new ContentView());
    }
});
