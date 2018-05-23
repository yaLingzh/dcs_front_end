<template>
	<div>
		<!-- {{currentProjectMessData|log}} -->
		<div class="dsc-table-content" style="min-height:80rem">
		<table class="dcs-common-table" v-if="currentProjectMessData">
			<!-- 当前规程为CASES -->
			<template  v-if="resultMsg == 'cases'">
			<thead>
				<tr v-for="(valRow, index) in currentProjectMessData" v-if="index < 3">
					<th style="width:30rem" v-for="(title, index) in valRow">{{title}}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-if="index > 3" v-for="(valRow, index) in currentProjectMessData" :key="'row_'+index" >
					<td v-for="(val, index) in valRow" :key="'cell_'+index">{{val}}</td>
				</tr>
			</tbody>
			</template>
			<!-- 当前规程不为CASES -->
			<template v-else>
				<thead>
				<tr v-for="(valRow, index) in currentProjectMessData" v-if="index < 4">
					<th style="width:30rem" v-for="(title, index) in valRow">{{title}}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-if="index > 4" v-for="(valRow, index) in currentProjectMessData" :key="'row_'+index" >
					<td v-for="(val, index) in valRow" :key="'cell_'+index">{{val}}</td>
				</tr>
			</tbody>
			</template>
		</table>
		<div v-else class="dcs-no-data"><i class="el-icon-info"></i>请打开规程！</div>
		</div>
	</div>
</template>
<script>
	import types from '../../store/project/types'
  import {mapGetters } from 'vuex';
 export default{
 	name:'currentProMess',
 	data(){
 		return {
 			currentKeyIndex:null,
 			currentRunResult:null,
 			currentProjectData:null,
 			currentProjectMessData:null, 
 			resultMsg:'cases',
 			runResultStatus:false,  //是否有规程在运行
 			loopStatus:null,  //是否循环
 			nextStatus:null, //是否有下一步子
 			isStopRun:false, //是否停止运行
 			setTimer:null, 
 		}
 	},
 	computed:{
      ...mapGetters({
          vxGlobal_curProjectDcs: types.GETTERS.curProjectDcs,
      }),
  },
 	created(){
 		let vm = this
 		vm.initRunDatas(); 

 		setTimeout(vm.intervalTime, 1000); 

 		vm.$bus.$on('currentProKey', msg=>{
 			vm.currentProjectData = msg
 			vm.resultMsg = msg.currentLevel
			if(msg.level != 1 && !vm.$_.isEmpty(vm.resultMsg)){
			  let currentProject = vm.$_.filter(vm.vxGlobal_curProjectDcs[vm.resultMsg], item=>{if(item.name == msg.label) {return item.content_rows}})
			  vm.currentProjectMessData = currentProject[0].content_rows
			}else{
				return
			}
 		})
 		vm.$bus.$on('automaticOperation', msg=>{
 			if(msg){
 				vm.runBeginFun()
 			}
 		})
 		vm.$bus.$on('stopRun', msg=>{
 			if(msg){
 				vm.stopRunStep()
 				vm.isStopRun = true
 			}
 		})

 	},
 	mounted(){
 		let vm = this
 	},
 	methods:{
 		/**
 		 * @Author      supper520love@126.com
 		 * @DateTime    2018-05-21
 		 * @discription {初始化执行的规程数据}
 		 * @param       {无}
 		 * @requires    {200}
 		 * @return      {Object}
 		 * @version     [1]
 		 * @return      {[Object]}              
 		 */
 		initRunDatas(){
 			let vm = this
 			let url = '/run/current'
 			vm.$axios.get(url).then(response=>{
 				if(response.status == 200){
 					vm.currentRunResult = response.data
 					if(!vm.$_.isEmpty(response.data)){
 						vm.runResultStatus = true
 						vm.$bus.$emit('currentRunDcs', response.data.obj);
 					}else{
 						vm.runResultStatus = false
 					}
 				}else{
 					vm.$message('当前运行规程出错，请重新请求！')
 				}
 			}).catch(response=>{
 				vm.$message('当前运行规程出错，请重新请求, 请联系管理员！')
 			})
 		},
    /**
     * @Author      supper520love@126.com
     * @DateTime    2018-05-21
     * @discription {开始运行自动执行方法事件}
     * @param       {obj_type, number}
     * @requires    {200}
     * @version     [version]
     * @return      {[Object]}             
     */
 		runBeginFun(){
 			let vm = this, url = '/run/run'
 			let params = {
 				obj_type: vm.currentProjectData.obj_type,
 				number: vm.currentProjectData.number
 			}
 			if(vm.runResultStatus){
 				vm.$message.warning('已有规程已经在运行！')
 				return false
 			}
 			vm.$axios.post(url, params).then(response=>{
 				if(response.status == 200){
 					vm.runResultStatus = true
 					vm.currentRunResult = response.data
 					vm.loopStatus = response.data.loop
 					vm.nextStatus = response.data.has_next
 					vm.comparisonData(vm.currentProjectMessData, vm.currentRunResult.result)
 				}else{
 					vm.$message.warning('当前扫执行规程出错，请重新请求！')
 				}
 			}).catch(response=>{
 				vm.$message('执行规程出错，请重新请求！')
 			})
 		},
 		/**
 		 * @Author      supper520love@126.com
 		 * @DateTime    2018-05-21
 		 * @discription {获取当前运行的结果}
 		 * @version     [version]
 		 * @return      {[obj]}              
 		 */
 		getCurrentRunResult(){
 			let vm = this, url = '/run/block_result'
 			vm.$axios.get(url).then(response=>{
 				if(response.status == 200){
 					vm.currentRunResult = response.data
 					vm.comparisonData(vm.currentProjectMessData, vm.currentRunResult.result)
 					vm.loopStatus = response.data.loop
 					vm.nextStatus = response.data.has_next
 				}else{
 					vm.$message.warning('请求数据出错！')
 				}
 			}).catch(response=>{
 				vm.$message.error('运行规程出错，请重新请求！')
 				return
 			})
 		},
 		/**
 		 * @Author      supper520love@126.com
 		 * @DateTime    2018-05-23
 		 * @discription {{继续运行规程}}
 		 * @param       {number} 规程编号
 		 * @version     [version]
 		 * @return      {[type]}              [description]
 		 */
 		goRunStep(){
 			let vm = this, url = '/run/run_step'
 			let params = {
 				number: vm.currentProjectData.number
 			}
 			vm.$axios.post(url, params).then(response => {
 				if(response.status == 200){
 					vm.currentRunResult = response.data
 					vm.loopStatus = response.data.loop
 					vm.nextStatus = response.data.has_next
 				}
 			})
 		},

 		stopRunStep(){
 			let vm = this, url="/run/stop"
 			let params = {
 				number: vm.currentProjectData.number
 			} 
 			vm.$axios.post(url, params).then(response => {
 				if(response.status == 200){
 					vm.isStopRun = response.data
    			clearInterval(vm.setTimer)
 					vm.runResultStatus = false
 				}else{
 					vm.$message.warning('停止运行请求数据出错！')
 				}
 			}).catch(response=>{
 				vm.$message('停止运行请求数据出错，请重新请求！')
 			})
 		},

 		comparisonData(targetData, newData){
 			let vm = this
 			let currentData = newData
 			let targetDatas = targetData
 			let getResultData = []
 			let currentDataKeys = currentData.keys()
 			console.log(currentDataKeys, 'currentDataKeys')
 			// currentData.map((item, key)=>{
 				
 			// })
 		},

 		intervalTime(){
 			let vm = this
 			if(vm.runResultStatus){
 				vm.setTimer = setInterval(vm.getCurrentRunResult(), 500)
 			}else{
 				return
 			}
 		}
 	},
 }
</script>

<style scoped="scoped" lang="scss">
  .dcs-common-table{
   tr{
   	//执行的当前tr
   	&.dcs-run-current{
			td{
				background: #4294f7
			}
		}	
		//已经执行的tr
		&.dcs-run-has{
			td{
				background: #f5f7fa
			}
		}	
   }
  }
	
</style>