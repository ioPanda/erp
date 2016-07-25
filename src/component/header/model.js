import Backbone from 'backbone';

var mm = {
  admin : [
    {
      text: 'menu11'
    },
    {
      text: 'menu22'
    }
  ],
  login : [
    {
      text: 'menu_login_1'
    }
  ]
};

export default Backbone.Model.extend({
  initialize: function(options) {
    return mm[options.type];
  }
});
