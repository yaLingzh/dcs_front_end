import {PROD_CONFIGS} from './envProdProfile'

// vuex 状态组件
export const STORE__GLOBAL = 'global'
export const LOCAL_STORAGE__SESSION = '_absdcddsadfs'
export const LOCAL_STORAGE__BASE_API = '/api/v1/'


/**
 * 是否是生产环境
 * @type {boolean}
 */
export const IS_ENV_PROD = process.env.NODE_ENV === 'production'

/**
 * 是否是开发环境
 * @type {boolean}
 */
export const IS_ENV_DEV = process.env.NODE_ENV === 'development'


/**
 * [API_BASE_URL_DEV_TEST 测试环境 API 地址]
 * @type {String}
 */

export const API_BASE_URL_DEV_TEST = 'http://10.144.238.103:8080/api/v1/'

export const API_BASE_URL_DEV = 'http://10.144.238.103:8080/api/v1/'


/**
 * @Author   supper520love@126.com
 * @DateTime 2018-04-10
 * @version  获取对应环境 api url
 * @return   {[string]}
 */
// function getApiBaseUrl() {
//   return process.env.API_BASE_URL || (
//       IS_ENV_PROD ? PROD_CONFIGS.apiBaseUrl : (
//         // 开发模式优先从localStorage中取
//         localStorage.getItem(LOCAL_STORAGE__BASE_API) || API_BASE_URL_DEV
//       ))
// }

// 优先从启动参数中获取 api uri
export const API_BASE_URL = localStorage.getItem(LOCAL_STORAGE__BASE_API) || API_BASE_URL_DEV
// export const AUTH_API_BASE_URL = IS_ENV_PROD ? PROD_CONFIGS.authApiBaseUrl : 'http://122.204.161.218:8005/'
// export const AUTH_CLIENT_ID = IS_ENV_PROD ? PROD_CONFIGS.clientId : '2AM6D9dG7kbygWmAC8aDmH'