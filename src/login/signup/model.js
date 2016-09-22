import Backbone from 'backbone';

export default Backbone.Model.extend({
  urlRoot: '/api/signupService',

  defaults: {
    name: 'admin',
    password:'',
    studentId:'',
    tel:'',
    email:'',
    className:'',
    major:'',
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

    if (attrs.studentId === '') {
      errors.push('studentId cannot be empty.');
    }

    if (attrs.tel === '') {
      errors.push('tel cannot be empty.');
    }

    if (attrs.email === '') {
      errors.push('email cannot be empty.');
    }

    if (attrs.className === '') {
      errors.push('className cannot be empty.');
    }

    if (attrs.major === '') {
      errors.push('major cannot be empty.');
    }
    return errors.length > 0 ? errors : undefined;
  }
});
