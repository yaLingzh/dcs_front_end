import Vue from 'vue'
import * as constants from './constants'
// import * as lodash from 'lodash'

import * as axios from 'axios'
import {sync} from 'vuex-router-sync'
import vueFilter from 'vue-filter'
import types from '../store/project/types'
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


  axios.defaults.baseURL = constants.API_BASE_URL
  axios.defaults.headers['Content-Type'] = 'application/json'
  axios.defaults.headers['Access-Control-Allow-Origin : http://10.144.238.103:8080']

  _historyProject()
  /**
   * AOP编程方式 设置全局的请求次数，请求的间隙
   * @type {Number}
   */
//   axios.defaults.retry = 4;
//   axios.defaults.retryDelay = 1000;
//   axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
//     var config = err.config;
//     // If config does not exist or the retry option is not set, reject
//     if(!config || !config.retry) return Promise.reject(err);
    
//     // Set the variable for keeping track of the retry count
//     config.__retryCount = config.__retryCount || 0;
    
//     // Check if we've maxed out the total number of retries
//     if(config.__retryCount >= config.retry) {
//         // Reject with the error
//         return Promise.reject(err);
//     }
    
//     // Increase the retry count
//     config.__retryCount += 1;
    
//     // Create new promise to handle exponential backoff
//     var backoff = new Promise(function(resolve) {
//         setTimeout(function() {
//             resolve();
//         }, config.retryDelay || 1);
//     });
    
//     // Return the promise in which recalls axios to retry the request
//     return backoff.then(function() {
//         return axios(config);
//     });
// });

}

export function registerFilters() {
  Vue.use(vueFilter)
  Vue.filter('log', (data) => {
    console.log(JSON.parse(JSON.stringify(data)))
    return ''
  })

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
 * base64 编码
 * @param str
 * @return {string}
 */
export function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1)
  }))
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

/*设置cookie*/
export function setCookieEncode(key, value){
  let oDate = new Date();
  oDate.setDate(oDate.getDate());
  document.cookie = key + '=' + b64EncodeUnicode(value) + ':expires=' + oDate;
}

/*删除cookie*/
export function removeCookie(key){
  setCookieEncode(key, '', -1); //Cookie保质期退回一天便可以删除
}
/*取cookie值 */
export function getCookieDecode(key){
  let cookieArr = document.cookie.split('=');
  if(document.cookie != null){
    for(let cookie of cookieArr){
      if(cookie == key){
        return b64DecodeUnicode(cookieArr[1])
      }
    }
  }else{
    return null
  }

}



/**
 * 设置 token
 */
export function setAxiosToken(token) {
  // 测试用，过期token
  // token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjhhMTA2ZWM0NWMyZWM4ZTMwMTVjMmVjOTNiODMwMDAwIiwidXNlcl9pZCI6MTUsImVtYWlsIjpudWxsLCJleHAiOjExOTU1MzA1MTF9.ZXkFDEOtm4XDZMo7RuzHVmb89MJj_vpCZ9jCvVuQH-M'
  axios.defaults.headers.common['Authorization'] = getAuthorizationTokenHeaderValue(token)
}
export function getAuthorizationTokenHeaderValue(token) {
  return 'JWT ' + token
}

export function _historyProject(){
  let vm = this
  let url = 'project/history'
  axios.get(url).then(response=>{
    if(response.status == 200){
      let historyProjectData = response.data.data
      setStorageDataAndEncode('historyProject',historyProjectData)
      // localStorage.setItem('historyProject', JSON.stringify(historyProjectData))
    }else{
      vm.$message.error('没有历史项目数据')
    }
  }).catch(response=>{
    console.log(response);
  })
}

export function _initCurrentOpenPro(){
  let vm = this
  let url = 'project'
  axios.get(url).then(response=>{
    if(response.status == 200){
      let datas = response.data
      store.commit(types.MUTATIONS.setCurProjectDatas, datas)
    }else{
      vm.$message.error('获取当前打开工程信息失败！')
    }
  }).catch(response=>{
    console.log(response.data);
  })
}


