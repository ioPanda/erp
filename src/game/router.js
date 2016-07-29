
import Backbone from 'backbone';
import Aside from '../component/aside/service';

export default Backbone.Router.extend({
  initialize(options = {}) {
    this.container = options.container;
    this.listenTo(this, 'before:enter', this.onBeforeEnter);
    this.listenTo(this, 'enter', this.onBeforeEnter);
    this.on('enter', this.onBeforeEnter);
    
    Aside.show('game');
  },

  onBeforeEnter() {
    console.log('game');
  },

  routes: {
    'game': 'index'
  },

  index() {
    // 
  }
});
