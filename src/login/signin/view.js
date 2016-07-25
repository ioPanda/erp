/* 
 * 
 */
import FormBehavior from '../../forms/behavior';
import Backbone from 'backbone';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import Util from '../../util';
import {history} from 'backbone';
import nprogress from 'nprogress';

export default ItemView.extend({
  template: template,
  className: 'wangxinyu',

  behaviors: {
    form: { behaviorClass: FormBehavior }
  },
  /*initialize(options = {}) {
    console.log(template());
  },*/

  ui: {
    inputName: '#name',
    inputPsw: '#password'
  },

  events: {
    'blur @ui.inputName': 'onNameChange',
    'blur @ui.inputPsw' : 'onPswChange',
    'submit form'         : 'handleSubmit'
  },

  serializeData() {
    return {
      errors: this.errors
    }
  },

  onInputChange(inputItem, cb) {
    var error = this.model.validate(inputItem);

    if (error) {
      this.errors = error;
      this.render();
    } else {
      // this.model.set(inputItem);
      cb && cb();
    }
  },

  onNameChange() {
    this.onInputChange({ name: this.ui.inputName.val() });
  },

  onPswChange() {
    this.onInputChange({ password: this.ui.inputPsw.val() });
  },

  handleSubmit() {
    this.onInputChange(this.form, () => {
      this.model.set(this.form);

      nprogress.start();
      Util.save(this.model)
          .then((res) => {
            res = _.invoke(res, 'toJSON');
            if (res.code == 1) {
              history.navigate('group', { trigger: true });
            } else {
              console.log(res.data.msg);
            }
            nprogress.done();   
          })
          .catch((err) => {
            nprogress.done(true);
            console.log('login ajax failed', err);
          });
    });
  }
});