/**
 * 生产版本 多环境配置
 * Created by yaAimee 2018-4-10.
 */

import {IS_ENV_PROD} from "./constants";
// 正式版
export const ENV_PROD_PROFILE_PROD = 'prod'
// 测试版
export const ENV_PROD_PROFILE_TEST = 'test'
//开发测试版
export const ENV_PROD_PROFILE_TEXT_DEV = 'devel'

export const ENV_PROD_PROFILES_NAMES = {
  [ENV_PROD_PROFILE_PROD]: '正式版',
  [ENV_PROD_PROFILE_TEST]: '测试版',
  [ENV_PROD_PROFILE_TEXT_DEV]: '开发测试版'
}

export const PROD_VERSION = process.env.VERSION

export const ENV_PROD_PROFILE = process.env.ENV_PROD_PROFILE


export const PROD_CONFIGS = {
  [ENV_PROD_PROFILE_PROD]: {
    authApiBaseUrl: 'http://10.144.238.103:8080/',// 认证中心
    apiBaseUrl: 'http://10.144.238.103:8080/api/v1/',// 基础api
  },
  [ENV_PROD_PROFILE_TEXT_DEV]: {
    authApiBaseUrl: 'http://10.144.238.103:8080/',// 认证中心
    apiBaseUrl: 'http://10.144.238.103:8080/api/v1/',// 基础api /api/v1/
  },
}[ENV_PROD_PROFILE]

if (IS_ENV_PROD && !PROD_CONFIGS) {
  throw '当前环境类型(版本)' + ENV_PROD_PROFILE + '不支持'
}

