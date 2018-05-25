<template>
	<div>
		{{currentProjectMessData|log}}
		<div class="dsc-table-content" style="min-height:80rem">
		<table class="dcs-common-table" v-if="currentProjectMessData">
			<!-- 当前规程为CASES -->
			<template  v-if="resultMsg == 'cases'">
			<thead>
				<tr v-for="(valRow, index) in currentProjectMessData" v-if="index < 3">
					<th :class="{'th1':index==0, 'th4':index == 3,'th5':index==5,'th6':index==6}" v-for="(title, index) in valRow">{{title}}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-if="index > 3" v-for="(valRow, index) in currentProjectMessData" :key="'row_'+index" >
				  <td v-if="colspan(valRow) == true" colspan="9">{{valRow[0]}}</td>
					<td v-else v-for="(val, index) in valRow" :key="'cell_'+index">{{val}}</td>
				</tr>
			</tbody>
			</template>
			<!-- 当前规程不为CASES -->
			<template v-else>
				<thead>
				<tr v-for="(valRow, index) in currentProjectMessData" v-if="index < 4">
					<th v-for="(title, index) in valRow" :class="{'th1':index==0,'th4':index == 3, 'th5':index==5,'th6':index==6}">{{title}}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-if="index > 4" v-for="(valRow, index) in currentProjectMessData" :class="{'dcs-run-has': index == isRunOk(index)}" :key="'row_'+index" >
				  <td v-if="colspan(valRow) == true" colspan="9">{{valRow[0]}}</td>
					<td v-else v-for="(val, index) in valRow" :key="'cell_'+index">{{val}}</td>
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
  var setTimer = null
 export default{
 	name:'currentProMess',
 	data(){
 		return {
 			currentKeyIndex:null,
 			currentRunResult:null, //result 当前的结果数据值 
 			currentProjectData:null,
 			currentProjectMessData:null, 
 			resultMsg:'cases',
 			runResultStatus:false,  //是否有规程在运行
 			loopStatus:null,  //是否循环
 			nextStatus:null, //是否有下一步子
 			isStopRun:false, //是否停止运行
 			isSingleStatus:false, //是否是单步执行
 			isAutomaticOperation:false, //是否是自动执行
 			// setTimer:null, 
 		}
 	},
 	computed:{
      ...mapGetters({
          vxGlobal_curProjectDcs: types.GETTERS.curProjectDcs,
      }),
  },
 	created(){
 		let vm = this
 		vm.initCurrentDatas(); 
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
 			vm.isAutomaticOperation = msg
 			if(msg&&!vm.runResultStatus){
 				vm.getRunBegin()
 			}else{
 				vm.intervalTime();
 			}
 		})
 		vm.$bus.$on('singleOperation', msg=>{
 			vm.isSingleStatus = msg
 			if(msg&&!vm.runResultStatus){
 				vm.getRunBegin()
 			}else{
 				vm.intervalTime()
 			}
 			if(!vm.loopStatus&&vm.nextStatus){
 				  vm.goRunStep()	
 			}
 		})
 		vm.$bus.$on('stopRun', msg=>{
 			vm.isStopRun = msg
 			if(!vm.runResultStatus){
 				vm.$message.warning('没有规程在执行!请打开一个规程并让其执行！')
 				return
 			}
 			if(msg){
 				vm.stopRunStep()
 			}
 		})

 		vm.$bus.$on('pause', msg=>{
 			if(!vm.runResultStatus){
 				vm.$message.warning('没有规程在执行!请打开一个规程并让其执行！')
 				return
 			}
 			if(msg){
 				vm.$message.info('执行的规程已经暂停!');
 				vm.clearInterval()
 				vm.initCurrentDatas()
 			}
 			
 		})

 		vm.$bus.$on('goOnRun', msg=>{
 			if(!vm.runResultStatus){
 				vm.$message.warning('没有规程在执行!请打开一个规程并让其执行！')
 				return
 			}
 			if(msg){
 				vm.$message.info('当前执行规程已恢复执行！')
 				vm.intervalTime()
 			}
 		})
 		
 		vm.$bus.$on('loopGoOnRun', msg=>{
 			if(!vm.runResultStatus){
 				vm.$message.warning('没有规程在执行!请打开一个规程并让其执行！')
 				return
 			}
 			if(msg&&vm.$_.isEmpty(vm.currentRunResult)){
 				vm.getRunBegin()
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
 		initCurrentDatas(){
 			let vm = this
 			let url = '/run/current'
 			vm.$axios.get(url).then(response=>{
 				if(response.status == 200){
 					if(!vm.$_.isEmpty(response.data)){
 						vm.runResultStatus = true
 						vm.currentRunResult = response.data
 						vm.$bus.$emit('currentRunDcs', response.data.obj);
 						if(vm.currentRunResult&&!vm.$_.isEmpty(vm.currentRunResult)){
	   				 vm.comparisonData(vm.currentProjectMessData, response.data.result)
	 					}
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
     * @discription {开始运行执行方法事件}
     * @param       {obj_type, number}
     * @requires    {200}
     * @version     [version]
     * @return      {[Object]}             
     */
 		getRunBegin(){
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
 					vm.loopStatus = response.data.loop
 					vm.nextStatus = response.data.has_next
 					vm.intervalTime();
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
 					vm.loopStatus = response.data.loop
 					vm.nextStatus = response.data.has_next
 					
 					if(!vm.loopStatus&&vm.nextStatus&&!vm.isSingleStatus&&!vm.$_.isEmpty(response.data)){
 						vm.goRunStep()
 					}else if(!vm.nextStatus){
 						vm.clearInterval()
 					}
 					if(vm.currentRunResult&&!vm.$_.isEmpty(vm.currentRunResult)){
   					vm.comparisonData(vm.currentProjectMessData, response.data.result)
 					}
 				}else{
 					vm.$message.warning('请求数据出错！')
 				}
 			}).catch(response=>{
 				console.log(response)
 				vm.$message.error('运行规程出错，请重新请求！')
 			})
 		},
 		/**
 		 * @Author      supper520love@126.com
 		 * @DateTime    2018-05-23
 		 * @discription {{执行下一步规程}}
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
    			vm.clearInterval()
 					vm.runResultStatus = false
 					vm.$bus.$emit('readyStopRun', false);
 					vm.$message.info('成功退出当前规程执行！')
 				}else{
 					vm.$message.warning('停止运行请求数据出错！')
 				}
 			}).catch(response=>{
 				vm.$message('停止运行请求数据出错，请重新请求！')
 			})
 		},

 		/**
 		 * 执行规程中数据值显示变更
 		 */

 		comparisonData(targetReplaceData, currentDataResult){
 			let vm = this
 			// console.log(targetReplaceData, 'currentDataResult')
 			_.forEach(targetReplaceData, (p_item, p_key)=>{
 				 if(p_key > 4){
 				   _.map(currentDataResult, (c_item, c_key)=>{
 				   	if(!c_item.points_result) {return}
 				   		let expectResult = []
 				   	  let actualResult = []
 				   	 c_item.points_result.map(r_item =>{
	 				   		expectResult.push(r_item.point + '=' + r_item.value)
 				    	})
 				    c_item.points_result.map(r_item =>{
 				   		actualResult.push(r_item.place + r_item.point + '=' + r_item.value)
 				   	})
 				   	 targetReplaceData[c_key][3] = vm.$_.toString(expectResult)
 				   	 targetReplaceData[c_key][4] = vm.$_.toString(actualResult)
 				   	 if(c_item.status == true){
 				   	  targetReplaceData[c_key][5] = c_item.status	
 				   	 }else{
 				   	 	targetReplaceData[c_key][6] = c_item.status
 				   	 }
	 				 })	
 				 }
 				 
 			})
 		},

 		colspan(data){
 			let vm = this
 			let compact = vm.$_.compact(data);
 			if(compact.length == 1){
 				return true
 			}
 			
 		},

 		/*是否已经执行过了*/
 		isRunOk(key){
 			let vm = this
 			let resultKeys = {}
 			if(vm.currentRunResult){
 				resultKeys = vm.$_.keys(vm.currentRunResult.result)
 			}
 			return vm.$_.toString(vm.$_.filter(resultKeys, item=>{
 				 return item == key
 			}))
 		},
 		clearInterval(){
 			let vm = this
 			clearInterval(setTimer)
 			return
 		},

 		intervalTime(){
 			let vm = this
 			clearInterval(setTimer)
 			if(vm.runResultStatus&&(vm.isAutomaticOperation||vm.isSingleStatus)){
 				setTimer = setInterval(vm.getCurrentRunResult, 500)
 			}
 			
 		}
 	},
 }
</script>

<style scoped="scoped" lang="scss">
  .dcs-common-table{
   tr{
   	th{
   		width:20rem;
   		&.th1{
   			width:8rem;
   		}
   		&.th4{
   			width:25rem;
   		}
   		&.th5{
   			width:15rem;
   		}
   		&.th6{
   			width:8rem;
   		}
   	}
   	td{
   		word-wrap:break-word;
   		word-break:break-all;
   		&.noLb{
   			border-left:none;
   		}
   	}
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