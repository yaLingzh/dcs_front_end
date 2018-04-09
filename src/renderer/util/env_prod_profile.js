/**
 * 生产版本 多环境配置
 * Created by hao.wang on 2017-6-4.
 */

import {IS_ENV_PROD} from "./constants";
// 预览演示版
export const ENV_PROD_PROFILE_PREVIEW = 'pre'
// 正式版
export const ENV_PROD_PROFILE_PROD = 'prod'
// 测试版
export const ENV_PROD_PROFILE_TEST = 'test'
//开发测试版
export const ENV_PROD_PROFILE_TEXT_DEV = 'devel'

export const ENV_PROD_PROFILES_NAMES = {
  [ENV_PROD_PROFILE_PREVIEW]: '预览版',
  [ENV_PROD_PROFILE_PROD]: '正式版',
  [ENV_PROD_PROFILE_TEST]: '测试版',
  [ENV_PROD_PROFILE_TEXT_DEV]: '开发测试版',
}

export const PROD_VERSION = process.env.VERSION

export const ENV_PROD_PROFILE = process.env.ENV_PROD_PROFILE


export const PROD_CONFIGS = {
  [ENV_PROD_PROFILE_PROD]: {
    authApiBaseUrl: 'http://center.hub.nercel.com/',// 认证中心
    apiBaseUrl: 'http://center.hub.nercel.com/api/v1/',// 基础api
    clientId: 'B3hCzu7LNdiKU8H7wsANqH',//暂未修改，为正式版的clientId
  },
  [ENV_PROD_PROFILE_PREVIEW]: {
    authApiBaseUrl: 'http://centerp.hub.nercel.com/',// 认证中心
    apiBaseUrl: 'http://centerp.hub.nercel.com/api/v1/',// 基础api
    clientId: 'vNtafsDLu8Pi7u8R9WFAem',//暂未修改，为演示版的clientId
  },
  [ENV_PROD_PROFILE_TEST]: {
    authApiBaseUrl: 'http://119.97.166.135:2030',//'http://119.97.166.135:2030/',// 认证中心
    apiBaseUrl: 'http://119.97.166.135:2030/api/v1',// 基础api /api/v1/
    clientId: 'fsnGUa9KWtS6eEPR6RjWHV',
  },
  [ENV_PROD_PROFILE_TEXT_DEV]: {
    authApiBaseUrl: 'http://122.204.161.218:8005/',// 认证中心
    apiBaseUrl: 'http://122.204.161.218:8005',// 基础api /api/v1/
    clientId: '6ybk6vpYzkSYPcYfXwq8Km',
  },
}[ENV_PROD_PROFILE]

if (IS_ENV_PROD && !PROD_CONFIGS) {
  throw '当前环境类型(版本)' + ENV_PROD_PROFILE + '不支持'
}

