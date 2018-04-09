import {PROD_CONFIGS} from './env_prod_profile'

export const STORE__GLOBAL = 'global'
export const LOCAL_STORAGE__SESSION = '_absdcddsadfs'
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