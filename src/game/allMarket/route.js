import {Route} from 'backbone-routing';
import _ from 'lodash';
import $ from 'jquery';
import Collection from './collection';
import LayoutView from './layout-view';
import BreadcrumbView from '../../component/breadcrumb/view';
import DoneView from './done/view';
import DoingView from './doing/view';
import TodoView from './todo/view';

export default Route.extend({
    initialize(options = {}) {
        this.container = options.container;
        this.collection = new Collection();
    },
    
    fetch () {
        add:true;
        return this.collection.fetch();
    },

    render () {

        this.layout = new LayoutView();
        this.container.show(this.layout);
        
        // 面包屑
        this.layout.breadcrumb.show(new BreadcrumbView({
            'mainNav': '市场管理',
            'title': '各类市场管理',
            'subTitle': 'Kinds Of Market Manager',
            'icon':'glyphicon-map-marker'
        }));
        
        let filter= _.chain(this.collection.models[0].get('DevelopedMarket')).value(),
            filterO = _.chain(this.collection.models[0].get('DevelopingMarket')).value(),
            filterT = _.chain(this.collection.models[0].get('UnDevelopMarket')).value();
        
        this.done = new Collection(filter);
        this.doing = new Collection(filterO);
        this.todo  = new Collection(filterT);
        console.log(this.done);

        this.layout.done.show(new DoneView({collection:this.done}));
        this.layout.doing.show(new DoingView({collection:this.doing}));
        this.layout.todo.show(new TodoView({collection:this.todo}));
    }

    
});
