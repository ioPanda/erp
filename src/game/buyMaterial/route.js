
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
            'mainNav' : '采购管理',
            'title' : '购买材料',
            'subTitle' : 'Purchase of raw materials',
            'icon' : 'glyphicon-shopping-cart'
        }));

        this.layout.content.show(new ContentView());
    }
});





