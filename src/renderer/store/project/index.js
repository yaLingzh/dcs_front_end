import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import * as constants from '../../util/constants'
import { getDefaultSession } from './utils.js'
import { getStorageDataAndDecode } from '../../util/common'
Vue.use(Vuex)

export default function () {

  let session = getStorageDataAndDecode(constants.LOCAL_STORAGE__SESSION) || getDefaultSession()

  const state = {
    /**
     * 登录相关状态
     */
    session,
  }

  return {
    state,
    actions,
    getters,
    mutations
  }
}
