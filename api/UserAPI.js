import {apiBase} from "./API_BASE"

export const userApi = apiBase + '/user'

export const userApiRegister = userApi + '/register'

export const userApiLogin = userApi +'/login'

export const userApiRefreshToken = userApi +'/refresh-token'

export const userApiLogout = userApi +'/logout'

export const userApiStatusLogin = userApi + '/getSaveLogin'

export const apiProtectedRoute = userApi + '/protected-route'

export const apiGetUser = userApi + '/getById/'

export const apiUpdatePassword = userApi + '/updatePassword/'





