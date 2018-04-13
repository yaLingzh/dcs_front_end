/**
 * Created by yaAimee on 2018-4-10.
 */
export const getDefaultSession = function () {
  return {
    tokenData: { // 当前角色token信息
      token: null,// [String] 当前角色api令牌
    },
    loginData: { // 当前登录信息（角色列表，ticket）
    },
    curRoleId: null,// 当前角色id
  }

}
