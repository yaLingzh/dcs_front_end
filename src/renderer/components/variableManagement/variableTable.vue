<template>
 <div>
 	<div class="variableSearchBox">
	  <el-select v-model="filter.column" class="m-r-15" placeholder="请选择">
	    <el-option
	      size="mini"
	      v-for="item in isShowTheadName(theaderDatas)"
	      :key="item.name"
	      :label="item.display"
	      :value="item.name">
	    </el-option>
	  </el-select>
	  <el-input style="width:15%" v-model="filter.columVal" class="m-r-15" placeholder="请输入内容"></el-input>
	  <el-select v-model="module.assocs" class="m-r-15" placeholder="请选择">
	    <el-option
	      v-for="item in assocs"
	      :key="item.value"
	      :label="item.label"
	      :value="item.value">
	    </el-option>
	  </el-select>
	  <el-select v-model="filter.column2" class="m-r-15" placeholder="请选择">
	    <el-option
	      v-for="item in isShowTheadName(theaderDatas)"
	      :key="item.name"
	      :label="item.display"
	      :value="item.name">
	    </el-option>
	  </el-select>
	  <el-input style="width:15%" class="m-r-15"  v-model="filter.columVal2" placeholder="请输入内容"></el-input>
	  <el-button type="primary" @click="searchDataResult" size="small" plain>检 索</el-button>
 	</div>
 	<!-- {{variablePointData|log}} -->
 	
    <el-table
      :data="variablePointData"
      style="width: 100%"
      ref="varTable"
      v-if="!$_.isEmpty(variablePointData)"
      >
       <el-table-column
        :label="head.display"
        width="130"
        v-for="(head, index) in isShowTheadName(theaderDatas)"
        v-if="head.name == 'force_value_display'"
        :key="head.name"
        >
        <template slot-scope="scope" v-loading="loading">
        	<p class="dcs-text-force">{{getForceVal(scope.row.point_name)}} <i class="el-icon-edit m-l-30" @click="isEditorClick(scope.row.point_name)"></i></p>
        	<p v-if="currentPointName == scope.row.point_name" class="dcs-editor-force">
        		 <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" class="demo-form-inline">
        		   	<el-form-item  prop="value">
                    <el-input :placeholder="getForceVal(scope.row.point_name)" @blur="submitForceData('ruleForm')" @keyup.enter="submitForceData('ruleForm')"   v-model="ruleForm.value" size="mini" clearable></el-input>
                </el-form-item>
              </el-form>
        		</p>
        </template>
        </el-table-column>
        <el-table-column
	        :label="head.display"
	        width="130"
	        v-for="(head, index) in isShowTheadName(theaderDatas)"
	        v-if="head.name == 'current_value_display'"
	        :key="head.name"
	        >
	        <template slot-scope='scope'>
	        	<p>{{getCurrentVal(scope.row.point_name)}}</p>
	        </template>
        </el-table-column>
      <el-table-column
        :prop="head.name"
        :label="head.display"
        width="130"
        v-for="head in isShowTheadName(theaderDatas)"
        v-if="head.name != 'force_value_display' && head.name != 'current_value_display'"
        :key="head.name"
        >
      </el-table-column>
    </el-table>
    <div v-else class="dcs-no-data"><i class="el-icon-loading"></i>暂无数据！</div>
 </div>
</template>
<script>
 import types from "../../store/project/types";
 import {mapGetters} from "Vuex";
 export default{
 	name:'variableTable',
 	data(){
 		return {
 			loading:false,
 			theaderDatas:null,
 			isShowHead:false,
 			scopeRowVal:null,
 			isEditor:false,
 			isEditorTxt:true,
 			module:{
 				forceValue:null,
 			},
 			filter:{
 				column:null,
 				column2:null,
 				columVal:null,
 				columVal2: null,
 				assocs:null,
 			},
 			currentPointName:null,
 			forceValueDatas:null,
 			currentValueDatas:null,
 			ruleForm:{
 				value:null,
 			},
 			assocs:[
	 			{value: 'or', label: 'Or'},
	 			{value: 'and', label: 'And'}
 			],
 			rules: {
            value: [
                { required: true, message: '请输入强制值', trigger: 'blur' },
            ],
        },
 		}
 	},
 	computed:{
      ...mapGetters({
        variablePointeList: types.GETTERS.variablePointeList,
        // 当前已选子强制点
        submittedPointeList: types.GETTERS.submittedPointeList,
      }),
    },
 	props:['variablePointData'],

 	created(){
 		let vm = this;
 		vm.initTableHeader()
 		vm.initCurrentVal()
 		vm.initForceVal()
 	},
 	methods:{
 		searchDataResult(){
 			let vm = this
 			if(vm.filter.assocs == 'or'){
 				vm.variablePointData = vm.variablePointData.map(item=>{
 					if(item[vm.filter.column] == vm.filter.columVal || item[vm.filter.column2] == vm.filter.columVal2){
 						return item
 					}else{
 						return false
 					}
 				})
 			}else{
 				vm.variablePointData = vm.variablePointData.map(item=>{
 					if(item[vm.filter.column] == vm.filter.columVal && item[vm.filter.column2] == vm.filter.columVal2){
 						return item
 					}else{
 						return false
 					}
 				})
 			}
 		},

 		isEditorClick(val){
 			let vm = this;
 			vm.isEditorTxt = false
 			vm.currentPointName = val
 			vm.isEditor = !vm.isEditor
 		},

 		/**
 		 * @Author      supper520love@126.com
 		 * @DateTime    2018-04-17
 		 * @description [获取当前值 ]
 		 * @return      {[Object]}              [点名对应的当前值 ]
 		 */
 		initCurrentVal(){
 			let vm = this;
 			let url = '/point/value'
 			let pointName = vm.variablePointData.map(item=>{return item.point_name})
 			vm.$axios.post(url, {
 				'point_name': pointName
 			}).then(response=>{
 				if(response.status == 200){
 					vm.currentValueDatas = response.data.value
 				}
 			})
 		},
 		/**
 		 * @Author      supper520love@126.com
 		 * @DateTime    2018-04-17
 		 * @description [匹配当前值]
 		 * @param       {[point_name]}              val [点name]
 		 */
 		getCurrentVal(val){
 			let vm = this
 			if(vm.$_.indexOf(vm.currentValueDatas, val) != -1){
 				if(!vm.$_.isEmpty(vm.currentValueDatas[val])){
 					return vm.currentValueDatas[val]
 				}else{
 					return '0'
 				}
 			}else{
 			  return '0'
 			}
 		},
 		/**
 		 * @Author      supper520love@126.com
 		 * @DateTime    2018-04-17
 		 * @description [初始化表格数据]
 		 * @return      {[Object]}              [初始化表格数据]
 		 */
 		initTableHeader(){
 			let vm = this
 			let url = '/point/column'
 			vm.$axios.get(url).then(response=>{
 				if(response.status == 200){
 					vm.theaderDatas = response.data.data
 				}else{
 					vm.$message.error('表格数据有误')
 				}
 			}).catch(response=>{
 				vm.$message.error('表格数据有误请求有误')
 			})
 		},
 		/**
 		 * @Author      supper520love@126.com
 		 * @DateTime    2018-04-17
 		 * @description [表格头动态 显示]
 		 * @param       {[Object]}              obj [表头数据对象]
 		 * @return      {Object}                 [表头数据对象]
 		 */
 		isShowTheadName(obj){
 			let vm = this
 			if(!vm.$_.isEmpty(vm.submittedPointeList)){
 				return vm.$_.flatten(vm.submittedPointeList.map(item =>{
 					 return vm.$_.filter(obj, ls =>{ return ls.display == item })
 				}))
 			}else{
 				return
 			}
 		},
 		initForceVal(){
 			let vm = this
 			let url = '/point/force'
 			let pointName = vm.variablePointData.map(item=>{return item.point_name})
 			vm.$axios.post(url, {'point_name': pointName}).then(response=>{
 				if(response.status == 200){
 					vm.forceValueDatas = response.data.value
 				}
 			})
 		},
 		/**
 		 * @Author      supper520love@126.com
 		 * @DateTime    2018-04-17
 		 * @description [匹配当前值]
 		 * @param       {[point_name]}              val [点name]
 		 */
 		getForceVal(val){
 			let vm = this
 			if(vm.$_.indexOf(vm.forceValueDatas, val) != -1){
 				if(!vm.$_.isEmpty(vm.forceValueDatas[val])){
 					return vm.forceValueDatas[val]
 				}else{
 					return '0'
 				}
 			}else{
 			  return '0'
 			}
 		},
 		/**
 		 * @Author      supper520love@126.com
 		 * @DateTime    2018-04-17
 		 * @description [设置强制变量]
 		 * @param       {[表单]}              formName [description]
 		 * @return      {[value]}                       [设置后的值 ]
 		 */
 		submitForceData(formName){
 			let vm = this
 			let url = '/point/force'
 			 this.$refs[formName].validate((valid) => {
 			 	 if (valid) {
	 			 	vm.loading = true
	 			 	  let params = {
	                        'value': vm.ruleForm.value,
	                       }
	          vm.$axios.post(url).then(response=>{
			 				if(response.status == 200){
			 					vm.isEditorTxt = true
			 					vm.isEditor = false
			 					vm.loading=false
			 					vm.ruleForm.value = response.data.value
			 				}else{
			 					vm.loading=false
			 					vm.$message.error('设置强制值失败！')
			 				}
			 			}).catch(response=>{
			 				vm.loading = false
			 				vm.$message.error('设置强制值请求失败！')
			 			})
		 		 }else{
		 		 	vm.loading=false
		 		 	return false
		 		 }
 			 });
 			
 		},
 	},
 }
</script>