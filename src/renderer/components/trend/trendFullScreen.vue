<template>
 <div>
 	<div class="siginalFullScreen" id="js-siginalFullScreen">
   <siginal-echarts :width="elWidth" :height="elHeight"></siginal-echarts>
   </div>
 </div>
</template>
<style scoped="scope">
 .siginalFullScreen{
 	position: fixed;
 	left: 0;
 	top: 0;
 	bottom: 0;
 	right: 0;
 	width: 100%;
 	height: 100%;
 	background: #fff;
 }
</style>
<script>
 export default{
 	name:'trendFullScreen',
 	data(){
 		return {
 			elWidth:null,
 			elHeight:null,
 		}
 	},
 	methods:{
 		getElParams(){
 			let vm = this
 			let $el = vm.$$('#js-siginalFullScreen');
 			vm.elWidth = $el.height()
 			vm.elHeight = $el.width()
 			
 			console.log(vm.elWidth, vm.elHeight);
 		}
 	},
 	created(){
 		let vm = this
 		vm.getElParams()
 	},
 	 components:{
    	siginalEcharts: resolve => require(['./signalEcharts.vue'], resolve),
    },
 }
</script>