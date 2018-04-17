/**
 * Created yaAimee on 2018/4/11.
 */
import types from './types'
import store from 'store'
import * as constants from '../../util/constants'
import { getDefaultSession } from './utils.js'
import { setAxiosToken, setStorageDataAndEncode } from '../../util/common'

function saveSession (session) {
  setStorageDataAndEncode(constants.LOCAL_STORAGE__SESSION, session)
}

export default {
  [types.MUTATIONS.setLoginData] (state, loginData) {
    state.session.loginData = loginData
    saveSession(state.session)
  },

  [types.MUTATIONS.setCurRole] (state, roleId) {
    state.session.curRoleId = roleId
    saveSession(state.session)
  },
  [types.MUTATIONS.setTokenData] (state, tokenData) {
    state.session.tokenData = tokenData
    setAxiosToken(tokenData)
    saveSession(state.session)
  },

  [types.MUTATIONS.resetSession] (state) {
    state.session = getDefaultSession()
    saveSession(state.session)
  },
  [types.MUTATIONS.setCurProjectDatas] (state, project) {
    state.session.projectCurDatas = project
    saveSession(state.session)
  },

  [types.MUTATIONS.setVariablePointListData] (state, pointe) {
    state.session.variablePointeList = pointe
    saveSession(state.session)
  },

  [types.MUTATIONS.setSubmittedPointeList] (state, selectedPointe) {
    state.session.selectedPointeList = selectedPointe
    saveSession(state.session)
  },

  // 选中的强制列表
  // [types.MUTATIONS.setSubmittedPointeList] (state, selectedPointe) {
  //   state.selectPointList = selectedPointe
  //   state.session.selectedPointeList = selectedPointe
  //   saveSession(state.session)
  // }

}