import Backbone from 'backbone';
import {Router} from 'backbone-routing';
import SinginRoute from './signin/route';
import SingupRoute from './signup/route';
import Aside from '../component/aside/service';

export default Router.extend({
  initialize(options = {}) {
    this.container = options.container;

    this.on('before:enter', this.onBeforeEnter);
  },

  onBeforeEnter() {
    Aside.hide();
  },

  routes: {
    'login/signin'    : 'signin',
    'login/signup'    : 'signup'
  },

  signin() {
    return new SinginRoute({
      container: this.container
    });
  },

  signup() {
    return new SingupRoute({
      container: this.container
    });
  }
});
