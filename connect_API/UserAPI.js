const userApi = 'http://192.168.1.5:3000/user'

const userApiRegister = userApi + '/register'

const userApiLogin = userApi +'/login'

const userApiRefreshToken = userApi +'/refresh-token'

const userApiLogout = userApi +'/logout'

const userApiStatusLogin = userApi + '/getSaveLogin'


module.exports = {
    userApiRegister,
    userApiLogin,
    userApiRefreshToken,
    userApiLogout,
    userApiStatusLogin
  }
