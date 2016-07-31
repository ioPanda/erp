import Backbone from 'backbone';
import {Router} from 'backbone-routing';
import Aside from '../component/aside/service';

export default Router.extend({
  initialize(options = {}) {
    this.container = options.container;

    this.on('before:enter', this.onBeforeEnter);
  },

  onBeforeEnter() {
  	Aside.show('admin');
  }
});
