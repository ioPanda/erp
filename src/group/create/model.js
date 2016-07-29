import Backbone from 'backbone';

export default Backbone.Model.extend({
  urlRoot: '/loginService',

  defaults: {
    name: 'admin',
    password: ''
  }
});