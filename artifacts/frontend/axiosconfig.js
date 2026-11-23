// axios基础配置
import axios from 'axios'
import self from '@/main'

/**
 * 获取 API 基础地址
 * 优先级: localStorage (应用模式) > window.siteUrl (传统模式) > window.location.origin
 */
function getBaseURL() {
  // 应用模式: 从 localStorage 读取用户配置的 API 地址
  if (process.env.VUE_APP_MODE === 'app') {
    const savedUrl = localStorage.getItem('API_BASE_URL')
    if (savedUrl) {
      return savedUrl
    }
    // 如果没有保存的地址,返回 null,不使用默认地址
    // 这将触发应用跳转到登录页面让用户填写服务器地址
    return null
  }

  // 传统模式: 使用 window.siteUrl 或当前域名
  return window.siteUrl || window.location.origin
}

// 确保 baseURL 不为 undefined
const baseURL = getBaseURL()
console.log('axios baseURL:', baseURL)
console.log('VUE_APP_MODE:', process.env.VUE_APP_MODE)

// 如果是应用模式且没有配置地址,设置一个临时占位符
// 实际请求会在拦截器中被阻止,并引导用户到登录页配置地址
axios.defaults.baseURL = baseURL || 'http://placeholder.local'
axios.defaults.withCredentials = true
axios.defaults.timeout = 200000
axios.defaults.crossDomain = true

// 导出 axios 实例供外部使用
window.axios = axios

// 标记是否需要配置服务器地址
window.needsServerConfig = process.env.VUE_APP_MODE === 'app' && !baseURL

axios.interceptors.request.use((config) => {
    // 如果是应用模式且没有配置服务器地址,阻止请求
    // 登录页面的测试连接请求除外(它会临时设置 baseURL)
    if (window.needsServerConfig && !config.baseURL) {
        return Promise.reject(new Error('请先配置服务器地址'))
    }

    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    config.headers['Authorization'] = self.getCookie('AUTHORIZATION')
    const name = window.CSRF_COOKIE_NAME || 'django_vue_cli_csrftoken'
    config.headers['X-CSRFToken'] = self.getCookie(name) || 'NOTPROVIDED'
    return config
})

axios.interceptors.response.use(response => {
    const status = response.status
    if (status > 300 || status < 200) {
        return {
            code: response.status,
            message: '请求异常，请刷新重试',
            result: false
        }
    }
    return response.data
}, error => {
    return {
        code: 500,
        message: error.response.data.message,
        error: error,
        result: false
    }
})

// 发送请求 (接口路径，参数，请求配置)
export function POST(url, params, config) {
    return new Promise((resolve, reject) => {
        axios.post(url, params, config).then(
            res => {
                resolve(res)
            },
            err => {
                reject(err)
            }
        )
            .catch(err => {
                reject(err)
            })
    })
}

export function GET(url, params, config) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
            config: config
        })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}
export function PUT(url, params, config) {
    return new Promise((resolve, reject) => {
        axios.put(url, params, config).then(
            res => {
                resolve(res)
            },
            err => {
                reject(err)
            }
        )
            .catch(err => {
                reject(err)
            })
    })
}
export function PATCH(url, params, config) {
    return axios.patch(url, params, config)
}
export function DELETE(url, params, config) {
    return new Promise((resolve, reject) => {
        axios.delete(url, {
            params: params,
            config: config
        })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}
// 前后端分离开发时重定向配置
// reUrl = '';  不需要重定向
// 应用模式下不需要代理重定向,因为直接连接到配置的 API 地址
// 传统模式下,开发环境需要通过代理访问后端
export const reUrl = (process.env.VUE_APP_MODE === 'app' || process.env.NODE_ENV === 'production') ? '' : '/api-proxy'
