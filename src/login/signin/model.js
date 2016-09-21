import Backbone from 'backbone';

export default Backbone.Model.extend({
  // ajax
  urlRoot: '/erp/user/login.do',

  defaults: {
    password: '',
    userId: 'qing',
    identity: 'teacher',
    ckeckCode: ''
  },

  validate(attrs = {}) {
    let errors = [];

    if (attrs.name === '') {
      errors.push('Name cannot be empty.');
    }

    if (attrs.password === '') {
      errors.push('password cannot be empty.');
    }

    if (attrs.identity === '') {
      errors.push('identity cannot be empty.');
    }

    if (attrs.checkcode === '') {
      errors.push('ckeckcode cannot be empty.');
    }

    return errors.length > 0 ? errors : undefined;
  }
});
