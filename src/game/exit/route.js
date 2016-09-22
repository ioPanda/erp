import {Route} from 'backbone-routing';
import LayoutView from './layout-view';
import AlertView from '../../component/modal/alert/view';
import View from './screen/view';

export default Route.extend({
    initialize(options = {}) {
        this.container = options.container;

        this.layout = new LayoutView();
        
        this.container.show(this.layout);
        this.layout.screen.show(new View());
        this.layout.alert.show(new AlertView({
        	title:'退出',
        	text:'确认退出比赛？'
        }));
    }
});
