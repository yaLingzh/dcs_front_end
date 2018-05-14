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

/**
 * @Author      supper520love@126.com
 * @DateTime    2018-04-24
 * @description [选中项目名称，路径]
 * @param       {[type]}              state [description]
 * @return      {[type]}                    [description]
 */
getters[types.GETTERS.curProject] = state => {
  let proDatas = state.currentProjectData
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

/**
 * @Author      supper520love@126.com
 * @DateTime    2018-04-24
 * @description [当前打开的规程]
 * @param       {[type]}              state [description]
 * @return      {[type]}                    [description]
 */
getters[types.GETTERS.curProjectDcs] = state => {
  let proDatas = state.currentProjectData ? state.currentProjectData : state.session.projectCurDatas
  return proDatas
}

getters[types.GETTERS.variablePointeList] = state => {
  return state.session.variablePointeList
}
//已经选择的 强制点
getters[types.GETTERS.submittedPointeList] = state => {
  return state.session.selectedPointeList
}

//已经建强制组名称项目
getters[types.GETTERS.getNewGroupPoint] = state => {
  return state.session.newGroupPoint
}
// getters[types.GETTERS.isBuildGroupPoint] = state => {
//   return state.session.newGroupPoint.isSuccess
// }





