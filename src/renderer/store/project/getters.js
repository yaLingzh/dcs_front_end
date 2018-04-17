import types from './types'
import * as constants from '../../util/constants'
// import * as _ from 'lodash'

let getters = {}
export default getters

getters[types.GETTERS.session] = state => {
  return state.session
}

// 当前用户角色列表
getters[types.GETTERS.roles] = state => {
  return state.session.loginData
}

// getters[types.GETTERS.ticket] = state => {
//   return state.session.loginData.ticket
// }

getters[types.GETTERS.token] = state => {
  return state.session.tokenData
}
// 是否已登录 [:Boolean]
getters[types.GETTERS.isLogged] = state => {
  return !!state.session.loginData.userName
}

getters[types.GETTERS.isRoleSelected] = (state, getters) => {
  let role = getters[types.GETTERS.role]
  return !!role
}

getters[types.GETTERS.curProject] = state => {
  let proDatas = state.session.projectCurDatas
  if(proDatas) {
    let curProject = {
      'proName': proDatas.name,
      'proPath': proDatas.path
    }
    return curProject
  }else{
    return false
  }
}

getters[types.GETTERS.variablePointeList] = state => {
  return state.session.variablePointeList
}
//已经选择的 强制点
getters[types.GETTERS.submittedPointeList] = state => {
  return state.session.selectedPointeList
}




