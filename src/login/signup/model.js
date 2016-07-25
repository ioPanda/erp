import Backbone from 'backbone';

export default Backbone.Model.extend({
  urlRoot: '/api/signupService',

  defaults: {
    name: 'admin',
    group: 'group-test',
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
