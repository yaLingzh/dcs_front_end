
// import PageMain from '@/components/index/PageMain'
// import HelloWorld from '@/components/PageMain'
export default [
    {
      path: '/',
      name: 'index',
      component: require('@/components/PageMain.vue').default
    },

	  {
	    meta: {
	      title: '变量组管理',
	    },
	    path: '/variable',
	    component: resolve => require(['../components/variableManagement/PageMain.vue'], resolve) 
	  },








]
