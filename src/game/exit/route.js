import {Route} from 'backbone-routing';
import LayoutView from './layout-view';
import Backbone from 'backbone';

export default Route.extend({
    initialize(options = {}) {
        this.container = options.container;
        this.layout = new LayoutView();
        
        this.container.show(this.layout);
        
    }
});
