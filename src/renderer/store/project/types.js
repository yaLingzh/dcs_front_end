const namespace = 'project/'
const namespaceRoleIs = namespace + 'role_is/'

export default {
  GETTERS: {
    /**
     * 用户角色列表
     */
    roles: namespace + 'roles',
    /**
     */
    personId: namespace + 'personId',
    
    /**
     *
     */
    ticket: namespace + 'ticket',
    
    /**
     *
     */
    token: namespace + 'token',
    /**
     * 当前已选择的角色
     */
    role: namespace + 'role',
    /**
     * 当前session数据对象
     */
    session: namespace + 'session',
    /**
     * 是否已经登录（已输入用户名密码）
     */
    isLogged: namespace + 'logged',
    /**
     * 【当前已经打开的项目】
     * @type {[Objtc]}
     */
    curProject: namespace + 'curProject',
  
  },
  ACTIONS: {
    /**
     * 登出 清除登录状态
     */
    loginOut: namespace + 'loginOut',
  },
  MUTATIONS: {
    setLoginData: namespace + 'setLoginData',
    resetSession: namespace + 'resetSession',
    setCurProjectDatas: namespace + 'setCurProjectDatas',
    setTokenData: namespace + 'setTokenData',
    setToken: namespace + 'setToken',
  }
}
