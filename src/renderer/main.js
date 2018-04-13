import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import {appInitInject, registerFilters} from './util/common'
import mixin_app__token from './util/tokenData'

const decamelize = require('decamelize')

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

appInitInject(store, router)
registerFilters()
decamelize('unicornRainbow', '-');

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  mixins:[mixin_app__token],
  store,
  template: '<App/>'
}).$mount('#app')
