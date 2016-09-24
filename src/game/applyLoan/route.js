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
            'mainNav' : '贷款与融资',
            'title' : '申请贷款',
            'subTitle' : '',
            'icon' : 'glyphicon-euro'
        }));

        this.layout.content.show(new ContentView());
    }
});




