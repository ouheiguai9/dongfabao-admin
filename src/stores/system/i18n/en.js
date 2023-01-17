import ElementPlusLocale from 'element-plus/es/locale/lang/en'

export default {
  app: {
    login: {
      title: import.meta.env.VITE_APP_TITLE_EN,
      user: 'Please input username',
      password: 'Please input password',
      ok: 'Login',
      register: 'Register',
      message: {
        'disable-register': 'The system is temporarily closed for registration',
        'empty-username': 'username is required',
        'empty-password': 'password is required',
      },
    },
    register: {},
    notice: {
      'operate-success': 'Operation succeeded',
      'operate-confirm': 'Confirm',
      'under-development': 'Coming soon',
      'confirm-logout': 'Confirm to exit the system',
    },
    error: {
      unknown: 'Unknown error',
      'invalid-token': 'Your token is time out, please login again',
      'network-error': 'Network error',
    },
  },
  element: ElementPlusLocale,
  desc: 'English',
}
