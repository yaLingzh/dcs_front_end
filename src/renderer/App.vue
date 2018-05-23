<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
	import  Vue from "vue"
	import ElementUI from 'element-ui'
	// import 'element-ui/lib/theme-chalk/index.css';
  import './element_ui_theme/index.css'
	import './sass/_common.scss'
	Vue.use(ElementUI)
  export default {
    name: 'dcs_front_end'
  }
</script>

<style>
  /* CSS */
</style>
