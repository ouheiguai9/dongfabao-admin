import ElementPlusLocale from 'element-plus/es/locale/lang/zh-cn'

export default {
  app: {
    login: {
      title: import.meta.env.VITE_APP_TITLE,
      user: '请输入用户名',
      password: '请输入密码',
      ok: '登录',
      register: '注册',
      message: {
        'disable-register': '系统暂不对外开放注册',
        'empty-username': '用户名不能为空',
        'empty-password': '密码不能为空',
      },
    },
    register: {},
    notice: {
      'operate-confirm': '操作确认',
      'under-development': '敬请期待',
      'confirm-logout': '确定退出系统',
    },
    error: {
      'invalid-token': '凭证已过期,请重新登录',
    },
  },
  element: ElementPlusLocale,
  desc: '简体中文',
}
