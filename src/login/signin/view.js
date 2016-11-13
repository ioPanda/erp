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
import _ from 'lodash';
import AlertView from '../../component/modal/service';

export default ItemView.extend({
  template: template,
  className: 'wangxinyu--test',

  behaviors: {
    form: { behaviorClass: FormBehavior }
  },

  initialize(options = {}) {
    this.onGetCode();
  },

  ui: {
    inputName: '#name',
    inputPsw: '#password',
    inputRole: '#identity',
    inputCode: '#checkcode',
  },

  events: {
    'blur @ui.inputName': 'onNameChange',
    'blur @ui.inputPsw' : 'onPswChange',
    'submit form'       : 'handleSubmit'
  },

  serializeData() {
    return {
      errors: this.errors,
      codePic: this.codePic
    }
  },

  onGetCode() {
    var getCodeUrl = '/erp/securityCodeImage/getSecurityCode.do';
    Util
      .ajax('GET', getCodeUrl)
      .then((rsp) => {
        console.log(rsp);
        this.codePic = rsp.data;
      });
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

  handleSubmit(e) {
    this.onInputChange(this.form, () => {
      this.model.set(this.form);
      this.model= _.invoke(this.model,'toJSON');

      nprogress.start();
      Util.ajax("POST",'/erp/user/login.do',this.model)
          .then((res) => {
            this.userID = res.data.userID;
            this.status = res.status;
            switch(this.status){
              case 0:
                // AlertView.request('alert',{title:"确认",text:"用户名 密码 身份信息输入有误！"});
                // 刷新页面
                // history.navigate('login/signin/',{trigger:true});
                history.navigate('login/signin',{trigger:true});
                break;
              case 1:
                // history.navigate("",{trigger:true});
                break;
              case 2:
                // history.navigate("",{trigger:true});
                break;
              case 3:
                history.navigate("admin/userList",{trigger:true});
                break;
              case 4:
                history.navigate("group",{trigger:true});
                break;
              case 5:
                // history.navigate("",{trigger:true});
                break;
              case 6:
                // history.navigate("",{trigger:true});
                break;
              case 7:
                localStorage.setItem('userID',this.userID);
                history.navigate("game",{trigger:true});

                break;
              case 8:
                // history.navigate("game/exit",{trigger:true});
                // 破产
                break;
              default :
                break;            
            };
            nprogress.done();
          })
          .catch((err) => {
            nprogress.done(true);

          });
    });
    // return false;
  }
});