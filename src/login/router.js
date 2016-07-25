import Backbone from 'backbone';
import SinginRoute from './signin/route';
import SingupRoute from './signup/route';

export default Backbone.Router.extend({
  initialize(options = {}) {
    this.container = options.container;
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
