import {Route} from 'backbone-routing';
import LayoutView from './layout-view';
import BreadcrumbView from '../../component/breadcrumb/view';
import ContentView from './content/view';
import Model from './model';

export default Route.extend({
    initialize(options = {}) {
        this.container = options.container;

        this.layout = new LayoutView();
        this.model = new Model();
    },

    render () {
        this.container.show(this.layout);

        // 面包屑
        this.layout.breadcrumb.show(new BreadcrumbView({
            'mainNav': '财务管理',
            'title': '应收账款贴现',
            'subTitle': 'Discount Accounts Receviable',
            'icon':'glyphicon-duplicate'
        }));

        this.layout.content.show(new ContentView());
    }
});
