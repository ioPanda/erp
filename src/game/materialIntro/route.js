import {Route} from 'backbone-routing';
import LayoutView from './layout-view';
import BreadcrumbView from '../../component/breadcrumb/view';
import ContentView from './content/view';

export default Route.extend({
    initialize(options = {}) {
        this.container = options.container;

        this.layout = new LayoutView();
        this.container.show(this.layout);

        //面包屑
        this.layout.breadcrumb.show(new BreadcrumbView({
            'mainNav' : '生产管理',
            'title' : '产品原料构成说明',
            'subTitle' : 'Produce raw material composition',
            'icon' : 'glyphicon-wrench'
        }));

        //产品原料构成说明部分
        this.layout.content.show(new ContentView());
    }
});
