import Backbone from 'backbone';

export default Backbone.Model.extend({
  // ajax
  urlRoot: '/api/signinService',

  defaults: {
    name: 'admin',
    password: ''
  },

  validate(attrs = {}) {
    let errors = [];

    if (attrs.name === '') {
      errors.push('Name cannot be empty.');
    }

    if (attrs.password === '') {
      errors.push('password cannot be empty.');
    }

    return errors.length > 0 ? errors : undefined;
  }
});
