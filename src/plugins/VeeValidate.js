import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)
VeeValidate.Validator.localize('zh_CN', {
  // 提示都是中文的
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field}和密码必须是一样的`,
  },
  // 表单验证哪些需要是中文
  attributes: {
    phone: '手机号',
    code: '短信验证码',
    password: '密码',
    password2: '确认密码',
    isAgree: '同意',
  },
})
VeeValidate.Validator.extend('phone', {
  getMessage: (field) => `请输入正确的` + field,
  validate: (value) => {
    const reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/
    return reg.test(value)
  },
})
