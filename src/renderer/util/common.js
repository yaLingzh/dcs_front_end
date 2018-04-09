import Vue from 'vue'
import * as constants from './constants'
// import entry from './entry.js'
// import _ from 'lodash'

import * as axios from 'axios'
import {sync} from 'vuex-router-sync'
import vueFilter from 'vue-filter'
// import types from '../store/global/types'
import Bus from './bus.js';
/**
 * app初始化，注入一些插件，vue原型属性和方法
 */
export function appInitInject(store, router) {
  // 同步route实例到vuex
  sync(store, router) // done.

  // 注入原型工具类方法
  Vue.prototype.$axios = axios
  Vue.prototype.$_ = _
  Vue.prototype.$$ = window.jQuery || window.$
  Vue.prototype.$bus = Bus

  axios.defaults.headers.post['Content-Type'] = 'application/json'
  
  // Vue.mixin({
  //   mounted() {
  //     this.$$el = $(this.$el)
  //   }
  // })


  // router.beforeEach((to, from, next) => {
  //   if (location.pathname === entry.app) {
  //     if (store.getters[types.GETTERS.isLogged] && store.getters[types.GETTERS.isRoleSelected]) {
  //       loginUserRole(store)
  //       return
  //     }
  //   }
  //   next()
  // })
  // 首页已登录 进入主页
}

export function registerFilters() {

  Vue.use(vueFilter)

}

/**
 * base64 解码
 * @param str
 * @return {string}
 */
export function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
}

export function dataURItoBlob(base64Data) {
  let byteString
  if (base64Data.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(base64Data.split(',')[1])
  else
    byteString = unescape(base64Data.split(',')[1])
  let mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0]
  let ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ia], {type: mimeString})
}

/**
 * 存储 storage 数据，并base64 编码
 */
export function setStorageDataAndEncode(key, value) {
  let json = JSON.stringify(value)
  localStorage.setItem(key, b64EncodeUnicode(json))
}

/**
 * 获取 storage 数据，并base64 解码
 * @return Object
 */
export function getStorageDataAndDecode(key, value) {
  let json = localStorage.getItem(key)
  if (json != null) {
    try {
      let jsonDecode = b64DecodeUnicode(json)
      return JSON.parse(jsonDecode)
    } catch (e) {
    }
  }
  return null
}