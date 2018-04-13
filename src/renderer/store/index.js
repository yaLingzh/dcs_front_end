import Vue from 'vue'
import Vuex from 'vuex'
import * as constants from '../util/constants'
import node_modules from './modules'
import project from './project'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {}
export default new Vuex.Store({
  state,
  node_modules,
  modules: {
    [constants.STORE__GLOBAL]: project(),
    // modules
  },
  strict: debug
})
