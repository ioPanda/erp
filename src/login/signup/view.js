
import FormBehavior from '../../forms/behavior';
import Backbone from 'backbone';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import _ from 'lodash';
import Util from '../../util';
import nprogress from 'nprogress';

export default ItemView.extend({
  template: template,
  className: 'wangxinyu',

  behaviors: {
    form: { behaviorClass: FormBehavior }
  },

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
      this.model= _.invoke(this.model,'toJSON');
      console.log(this.model);
      Util.ajax('POST','/erp/user/addRegister.do',this.model)
          .then((res) => {
            if(res){
              console.log(res.status);
            }else{
              console.log(res.status);
            }
            nprogress.done();
          })
          .catch((res) => {
            nprogress.done(true);
          });
    });
  }
});