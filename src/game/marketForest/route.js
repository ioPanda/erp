/*
* by fangqing
*/
import {Route} from 'backbone-routing';
import LayoutView from './layout-view';
import BreadcrumbView from '../../component/breadcrumb/view';
import ChartView from './chart/view';
import CheckedView from './checked/view';
import Collection from './markets-colletion';
import Util from '../../util.js';
import Backbone from 'backbone';
import _ from 'lodash';

export default Route.extend({
    initialize(options = {}) {
        this.container = options.container;
        this.layout = new LayoutView();
        this.collection = new Collection();
        
    },

    fetch () {
        return this.collection.fetch();
    },

    render () {
        let filter = _.chain(this.collection.models[0].get('data')).value();
        this.coll = new Collection(filter);

        this.container.show(this.layout);
        
        this.layout.breadcrumb.show(new BreadcrumbView({
        	'mainNav':'市场管理',
        	'title':'市场预测信息',
        	'subTitle':'Market Forest',
        	'icon':'glyphicon-map-marker'
        }));

        this.layout.select.show(new CheckedView({collection:this.coll}));
        // biaoge
        this.layout.chart.show(new ChartView());

    }
});
