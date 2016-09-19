import {Route} from 'backbone-routing';
import LayoutView from './layout-view';
import BreadcrumbView from '../../component/breadcrumb/view';
import ContentView from './content/view';
import Model from './model';
import Model1 from './model1';

export default Route.extend({
    initialize(options = {}) {
        this.container = options.container;

        this.layout = new LayoutView();
        this.model = new Model();
        this.model1 =new Model1();
    },

    // fetch () {
    //     return this.model.fetch();
           // return this.model1.fetch();
    // },

    render () {
        this.container.show(this.layout);

        // 面包屑
        this.layout.breadcrumb.show(new BreadcrumbView({
            'mainNav': '主页',
            'title': '年度规划会议',
            'subTitle': 'Annual Planning Meeting',
            'icon':'glyphicon-home'
        }));

        // 年度会议规划部分
        this.layout.content.show(new ContentView({
            model:this.model,
            model1:this.model1
        }));
    }
});
