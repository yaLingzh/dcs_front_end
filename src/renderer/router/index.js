import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

export default new Router({
  routes
  // routes: [
  //   {
  //     path: '/',
  //     name: 'landing-page',
  //     component: require('@/components/LandingPage').default
  //   },
  //   {
  //     path: '*',
  //     redirect: '/'
  //   }
  // ]
})