import {Route} from 'backbone-routing';
import LayoutView from './layout-view';
import BreadcrumbView from '../../component/breadcrumb/view';
import ChartView from './chart/view';
import CheckedView from './checked/view';
import Collection from './collection';

export default Route.extend({
    initialize(options = {}) {
        this.container = options.container;
        this.collection = new Collection();
        this.layout = new LayoutView();
    },

    fetch () {
        return this.collection.fetch();
    },

    render () {
        console.log(this.collection);
        this.container.show(this.layout);
        
        this.layout.breadcrumb.show(new BreadcrumbView({
        	'mainNav':'市场管理',
        	'title':'市场预测信息',
        	'subTitle':'Market Forest',
        	'icon':'glyphicon-map-marker'
        }));

        this.layout.select.show(new CheckedView());

        this.layout.chart.show(new ChartView({collection:this.collection}));

    }
});
