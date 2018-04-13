/**
 * Created by yaAimee on 2018-4-10.
 * App.vue 的 mixins
 */
import {setAxiosToken} from './common'
import types from '../store/project/types'

export default {
  beforeCreate(){
    // 获取token
    let vm = this
    let token = vm.$store.getters[types.GETTERS.token] || ''
    setAxiosToken(token)
  }
}
