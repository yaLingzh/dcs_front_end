<template>
	<div>
		<div class="dsc-table-content" style="min-height:80rem">
		<table class="dcs-common-table" v-if="currentProjectMessData">
			<!-- 当前规程为CASES -->
			<!-- {{currentProjectMessData|log}} -->
			<template  v-if="resultMsg == 'cases'">
			<thead>
				<tr v-for="(valRow, index) in currentProjectMessData" v-if="index < 3">
					<th :class="{'th1':index==0, 'th4':index == 3,'th5':index==5,'th6':index==6}" v-for="(title, index) in valRow">{{title}}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-if="index > 3" v-for="(valRow, index) in currentProjectMessData" :key="'row_'+index"  :class="{'dcs-run-has': isRunOk(index), 'tabHead':currentTableHead(valRow) == true}">
				  <td v-if="colspan(valRow) == true" class="valTitle" colspan="9">{{valRow[0]}}</td>
					<td v-else v-for="(val, index) in valRow" :key="'cell_'+index" :class="{'td5':index==5}">
						<span v-if="(val == true||val == 1) && index ==5"><em class="el-icon-check"></em></span>
					 <span v-else-if="val == false && ! $_.isEmpty(val) && index ==6"><em class="el-icon-close"></em></span>
					 <span v-else>{{val}}</span>
					</td>
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
				<tr v-if="index > 4" v-for="(valRow, index) in currentProjectMessData" :class="{'dcs-run-has': isRunOk(index),'tabHead':currentTableHead(valRow)}" :key="'row_'+index" >
				  <td v-if="colspan(valRow) == true" class="valTitle" colspan="9">{{valRow[0]}}</td>
					<td v-else v-for="(val, index) in valRow" :key="'cell_'+index" :class="{'tdCenter':index==5||index==6}">
					 <span v-if="(val == true||val == 1) && index ==5"><em class="el-icon-check"></em></span>
					 <span v-else-if="(val == false||val==0) && !$_.isEmpty(val) && index ==6"><em class="el-icon-close"></em></span>
					 <span v-else>{{val}}</span>
					 </td>
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
 			currentProjectData:null, //当前要运行的 规程
 			currentProjectMessData:null, 
 			resultMsg:'cases',
 			runResultStatus:false,  //是否有规程在运行
 			loopStatus:null,  //是否循环
 			nextStatus:null, //是否有下一步子
 			isStopRun:false, //是否停止运行
 			isSingleStatus:false, //是否是单步执行
 			isAutomaticOperation:false, //是否是自动执行
 			isLoop:false,
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
 		// setTimeout(vm.intervalTime, 1000);
 		vm.$bus.$on('currentProKey', msg=>{
 			vm.currentProjectData = msg
 			//今年列表数据 
 			if(msg.isStopData && vm.$_.has(msg, 'isStopData')){
 				vm.stopCurrentDcsDatas(msg.run_uuid)
 				vm.resumeCurrentSelectDcs(msg.run_uuid)
 				vm.intervalTime();
 				return
 			}

 			vm.resultMsg = msg.currentLevel
			if(msg.level != 1 && !vm.$_.isEmpty(vm.resultMsg)){
			  let currentProject = vm.$_.filter(vm.vxGlobal_curProjectDcs[vm.resultMsg], item=>{if(item.name == msg.label) {return item.content_rows}})
			  	vm.currentProjectMessData = currentProject[0].content_rows
			}else{
				return
			}

 		})

 		// vm.$watch('currentProjectData', ()=>{
 		// 	vm.runResultStatus = false
 		// 	vm.currentRunResult = null
 		// })

 		vm.$bus.$on('automaticOperation', msg=>{
 			vm.isAutomaticOperation = msg
 			if(msg&&!vm.runResultStatus){
 				vm.getRunBegin()
 			}else{
 				vm.intervalTime();
 			}
 		})
 		// 单步执行
 		vm.$bus.$on('singleOperation', msg=>{
 			vm.isSingleStatus = msg
 			if(msg&&!vm.runResultStatus){
 				vm.getRunBegin()
 			}else{
 				vm.intervalTime()
 			}
 			if(vm.loopStatus&&vm.nextStatus){
 				  vm.goRunStep()	
 			}
 		})
 		vm.$bus.$on('stopRun', msg=>{
 			vm.isStopRun = msg
 			if(!vm.runResultStatus){
 				vm.$bus.$emit('readyStopRun', false)
 				vm.$message.warning('没有规程在执行!请打开一个规程并让其执行！')
 				return
 			}
 			vm.stopRunStep()
 		})

 		vm.$bus.$on('pause', msg=>{
 			if(!vm.runResultStatus){
 				vm.$bus.$emit('isPauseDisabled', false)
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
 				vm.$bus.$emit('isGoOnDisabled', false)
 				vm.$message.warning('没有规程在执行!请打开一个规程并让其执行！')
 				return
 			}
 			if(msg){
 				vm.$message.info('当前执行规程已恢复执行！')
 				vm.intervalTime()
 			}
 		})
 		
 		vm.$bus.$on('loopGoOnRun', msg=>{
 			// if(!vm.runResultStatus){
 			// 	vm.$bus.$emit('isLoopDisabled', false)
 			// 	vm.$message.warning('没有规程在执行!请打开一个规程并让其执行！')
 			// 	return
 			// }
 			// 
 			vm.isLoop = msg
 			if(msg&&!vm.runResultStatus){
 				vm.getRunBegin()
 			}else{
 				vm.intervalTime();
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
 						vm.currentRunResult = response.data
 						vm.runResultStatus = true
 						vm.$bus.$emit('isCurrentDcsRun', true)
 						vm.$bus.$emit('currentRunDcs', response.data.obj);
 						vm.$nextTick(()=>{
 							if(vm.currentRunResult&&!vm.$_.isEmpty(vm.currentRunResult)){
		   				 vm.comparisonData(vm.currentProjectMessData, response.data.result)
		 					}
 						})
 					}else{
 						vm.runResultStatus = false
 						vm.$bus.$emit('isCurrentDcsRun', false)
 					}
 				}else{
 					vm.$message('当前运行规程出错，请重新请求！')
 				}
 			}).catch(response=>{
 				vm.$message('当前运行规程出错，请重新请求, 请联系管理员！')
 			})
 		},
 		stopCurrentDcsDatas(uuid){
 			let vm = this
 			let url = '/run/resume/contents'
 			let params = {
 				run_uuid: uuid
 			}
 			vm.$axios.get(url, {params}).then(response => {
 				if(response.status == 200){
 					vm.currentProjectMessData = response.data.data
 				}else{
 					vm.$message.warning('获取当前恢复列表数据出错！')
 				}
 			}).catch(response => {
 				console.log(response + '恢复停止列表数据出错！')
 			})
 		},
 		/**
 		 * @Author      supper520love@126.com
 		 * @DateTime    2018-05-29
 		 * @discription {{恢复运行}}
 		 * @param       {}
 		 * @requires    {}
 		 * @return      {}
 		 * @version     [version]
 		 * @return      {[type]}              [description]
 		 */
 		resumeCurrentSelectDcs(uuid){
 			let vm = this
 			let url =  "/run/resume"
 			let params = {
 				run_uuid: uuid
 			}
 			vm.$axios.post(url, params).then(response => {
 				if(response.status == 200){
 					if(!vm.$_.isEmpty(response.data)){
 						vm.runResultStatus = true
 						vm.currentRunResult = response.data
 						vm.$bus.$emit('isCurrentDcsRun', true)
 						vm.$bus.$emit('currentRunDcs', response.data.obj);
 						vm.$nextTick(()=>{
 						  if(vm.currentRunResult&&!vm.$_.isEmpty(vm.currentRunResult)){
		   				 vm.comparisonData(vm.currentProjectMessData, response.data.result)
		 					}
		 				})
 					}else{
 						vm.runResultStatus = false
 						vm.$bus.$emit('isCurrentDcsRun', false)
 					}
 				}else{
 					vm.$message.warning('获取当前恢复列表数据信息！')
 				}
 			}).catch(response => {
 				console.log(response + '恢复停止列表数据信息出错！')
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
 					vm.$bus.$emit('isCurrentDcsRun', true) //当前有规程在运行
 					vm.loopStatus = response.data.can_run_next
 					vm.nextStatus = response.data.has_next
 					vm.intervalTime();
 				}else{
 					vm.$bus.$emit('isCurrentDcsRun', false)
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
 			if(vm.isStopRun){return}
 			vm.$axios.get(url).then(response=>{
 				if(response.status == 200){
 					vm.currentRunResult = response.data
 					vm.loopStatus = response.data.can_run_next
 					vm.nextStatus = response.data.has_next
 					vm.$nextTick(()=>{
	 					if(vm.loopStatus&&vm.nextStatus&&!vm.isSingleStatus&&!vm.$_.isEmpty(response.data)){
	 						vm.goRunStep()
	 					}else if(!vm.nextStatus && !vm.isLoop){
	 						vm.$message.info('当前规程执行完成！');
	 						vm.runResultStatus = false
	 						vm.currentRunResult = null
	 						vm.$bus.$emit('isDisabled', false);
	 						vm.initCurrentDatas()
	 						vm.clearInterval()
	 					}else if(!vm.nextStatus && vm.isLoop){ //轮循执行
	 						vm.getRunBegin()
	 					}
	 					if(vm.currentRunResult&&!vm.$_.isEmpty(vm.currentRunResult)){
	   					vm.comparisonData(vm.currentProjectMessData, response.data.result)
	 					}
	 				})
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
 					vm.loopStatus = response.data.can_run_next
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
 					vm.$bus.$emit('isCurrentDcsRun', false) //当前没有规程在运行
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
 				   	  targetReplaceData[c_key][6] = ''
 				   	 }else{
 				   	 	targetReplaceData[c_key][5] = ''
 				   	 	targetReplaceData[c_key][6] = c_item.status
 				   	 }
 				   	 vm.isRunOk(c_key)
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
 		currentTableHead(data){
 			let vm = this
 			let compact = vm.$_.compact(data);
 			if(vm.$_.includes(compact, "测试用例")|| vm.$_.includes(compact, "序号") || vm.$_.includes(compact, "操作") ){
 				return true
 			}
 		},

 		/*是否已经执行过了*/
 		isRunOk(key){
 			let vm = this
 			let resultKeys = {}
 			if(!vm.currentRunResult){
 				console.log(vm.currentRunResult + '为空！')
 				return
 			}
			resultKeys = vm.$_.keys(vm.currentRunResult.result)
			let isOkKey = vm.$_.filter(resultKeys, item=>{
				 return item == key
		   	})
 			return isOkKey[0] == _.toString(key)
 		},
 		// isRunOk(key){
 		// 	let vm = this
 		// 	let resultKeys = {}
 		// 	if(vm.currentRunResult){
 		// 		resultKeys = vm.$_.keys(vm.currentRunResult.result)
 		// 	}
 		// 	return vm.$_.toString(vm.$_.filter(resultKeys, item=>{
 		// 		 return item == key
 		// 	}))
 		// },
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
 	beforeDestory(){
    let vm = this
    vm.$bus.$off('currentProKey', true);
    vm.$bus.$off('currentProjectData', true);
    vm.$bus.$off('automaticOperation', true);
    vm.$bus.$off('singleOperation', true);
    vm.$bus.$off('stopRun', true);
    vm.$bus.$off('pause', true);
    vm.$bus.$off('goOnRun', true);
    vm.$bus.$off('loopGoOnRun', true);

  }
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
   		&.tdCenter{
   			text-align: center;
   			font-size:1.8rem;
   		}
   		&.valTitle{
   			background:#E4E7ED;
   			// font-size:1.5rem;
   			// font-weight:bold;
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
				background: #F2F6FC
			}
		}	
   }
  }
	
</style>