import {Route} from 'backbone-routing';
import LayoutView from './layout-view';
import BreadcrumbView from '../../component/breadcrumb/view';
import ContentView from './content/view';
import HouseBuildView from '../../component/popUp/houseBuild/view.js';

export default Route.extend({
    initialize(options = {}) {
        this.container = options.container;

        this.layout = new LayoutView();
        this.container.show(this.layout);

        //面包屑
        this.layout.breadcrumb.show(new BreadcrumbView({
            'mainNav' : '生产管理',
            'title' : '厂房管理',
            'subTitle' : 'Workshop management',
            'icon' : 'glyphicon-wrench'
        }));

        //生产管理部分
        this.layout.content.show(new ContentView());

        this.layout.body.show(new HouseBuildView());
    }

});