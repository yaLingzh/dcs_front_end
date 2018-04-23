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
		<div v-else class="dcs-no-data"><i class="el-icon-loading"></i>请打开规程！</div>
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
 			currentProjectMessData:null,
 			resultMsg:'cases',
 		}
 	},
 	computed:{
      ...mapGetters({
          vxGlobal_curProjectDcs: types.GETTERS.curProjectDcs,
      }),
  },
 	created(){
 		let vm = this
 		vm.$bus.$on('currentProKey', msg=>{
 			vm.resultMsg = msg.currentLevel
			if(msg.level != 1 && !vm.$_.isEmpty(vm.resultMsg)){
			  let currentProject = vm.$_.filter(vm.vxGlobal_curProjectDcs[vm.resultMsg], item=>{if(item.name == msg.label) {return item.content_rows}})
			  vm.currentProjectMessData = currentProject[0].content_rows
			}else{
				return
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