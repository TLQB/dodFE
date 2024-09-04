import axios from 'axios'
import { MessageBox } from 'element-ui'
import { UserModule } from '@/store/modules/user'
import { getAcToken, getRfToken } from '@/utils/cookies'
import jwtDecode from 'jwt-decode'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000
  // withCredentials: true // send cookies when cross-domain requests
})

let isRefreshing = false

service.interceptors.request.use(
  async(config) => {
    if (UserModule.token && !isRefreshing) {
      const decodeToken: any = jwtDecode(UserModule.token)
      const nowInSecs = Date.now() / 1000
      const isExpiring = (decodeToken.exp - nowInSecs) < 60 // Refresh trước 60 giây

      if (isExpiring && config.url !== '/admin/check/') {
        isRefreshing = true
        try {
          const token: any = getRfToken()
          await UserModule.CheckToken(token)
          config.headers.Authorization = `Bearer ${getAcToken()}`
        } catch (error) {
          console.error('Token refresh failed:', error)
          // Xử lý lỗi, có thể đăng xuất người dùng
        } finally {
          isRefreshing = false
        }
      } else if (config.url !== '/admin/check/') {
        config.headers.Authorization = `Bearer ${getAcToken()}`
      }

      config.headers.Authorization = `Bearer ${getAcToken()}`
    }

    config.headers['Content-type'] = 'application/json'
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    // Some example codes here:
    // code == 20000: success
    // code == 50001: invalid access token
    // code == 50002: already login in other place
    // code == 50003: access token expired
    // code == 50004: invalid user (user not exist)
    // code == 50005: username or password is incorrect
    // You can change this part for your own usage.
    const res = response.data
    if (res.access_token) {
      return {
        code: 200,
        message: 'Success',
        data: res
      }
    }

    if (res.code !== 200) {
      // Message({
      //   message: res.message || 'Errors',
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          UserModule.ResetToken()
          location.reload() // To prevent bugs from vue-router
        })
      }
      // return Promise.reject(new Error(res.message || 'Error'))
      return response.data
    } else {
      return response.data
    }
  },
  async(error) => {
    const errCode = error.response.status
    const config = error.config

    if (errCode === 401) {
      config._retry = true // handle refresh api
      const token: any = getRfToken()
      if (token) {
        const newAccessToken = await UserModule.CheckToken(token)
        if (newAccessToken) {
          config.headers.Authorization = 'Bearer ' + newAccessToken
          service(config)
          return
        } else {
          // handle remove token in here
          window.location.href = '/login'
          return
        }
      }
    }

    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
