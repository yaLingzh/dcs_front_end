<template>
	<div>
		<!-- {{currentProjectMessData|log}} -->
		<table class="dcs-common-table">
			<thead v-if="resultMsg[0] == 1">
				<tr  v-for="(valRow, index) in currentProjectMessData" v-if="currentProjectMessData.length<4">
					<th v-for="(val, index) in valRow"></th>
				</tr>
			</thead>
			<thead v-else>
				<tr  v-for="(valRow, index) in currentProjectMessData" v-if="currentProjectMessData.length<4">
					<th v-for="(val, index) in valRow"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-if="currentProjectMessData.length > 4" v-for="(valRow, index) in currentProjectMessData" :key="'row_'+index" >
					<td v-for="(val, index) in valRow" :key="'cell_'+index">{{val}}</td>
				</tr>
			</tbody>
		</table>
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
 			currentProjectMessData:null,
 			resultMsg:null,
 		}
 	},
 	computed:{
      ...mapGetters({
          vxGlobal_curProjectDcs: types.GETTERS.curProjectDcs,
      }),
  },
 	created(){
 		let vm = this
 		// console.log(vm.vxGlobal_curProjectDcs);
 		vm.$bus.$on('currentProKey', msg=>{
 			vm.resultMsg = msg.split('-')
 			vm.currentKeyIndex = Number(vm.resultMsg[1]-1)
 			if(vm.resultMsg[0] == 1){
 				vm.currentProjectMessData = vm.vxGlobal_curProjectDcs.cases[vm.currentKeyIndex].content_rows
 			}else if(vm.resultMsg[0] == 2){
 				vm.currentProjectMessData = vm.vxGlobal_curProjectDcs.case_groups[vm.currentKeyIndex].content_rows
 			}else if(vm.resultMsg[0] == 3){
 				vm.currentProjectMessData = vm.vxGlobal_curProjectDcs.procedures[vm.currentKeyIndex].content_rows
 			}

 		})

 	},
 	mounted(){
 		let vm = this
 	},
 	methods:{

 	},
 }
</script>