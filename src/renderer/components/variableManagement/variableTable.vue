<template>
 <div>
 	<div class="variableSearchBox">
	  <el-select v-model="filter.column" class="m-r-15" placeholder="请选择">
	    <el-option
	      size="mini"
	      v-for="item in isShowTheadName(theaderDatas)"
	      :key="item.name"
	      :label="item.display"
	      :value="item.name"
	      v-if="item.name != 'force_value_display'&&item.name != 'current_value_display'"
	      >
	    </el-option>
	  </el-select>
	  <el-input style="width:15%" v-model="filter.columVal" class="m-r-15" placeholder="请输入内容"></el-input>
	  <el-select v-model="filter.assocs" style="width: 6%" class="m-r-15" placeholder="请选择">
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
	      :value="item.name"
	      v-if="item.name != 'force_value_display' && item.name != 'current_value_display'"
	      >
	    </el-option>
	  </el-select>
	  <el-input style="width:15%" class="m-r-15"  v-model="filter.columVal2" placeholder="请输入内容"></el-input>
	  <el-button type="primary" @click="searchDataResult" size="small" plain>检 索</el-button>
 	</div>
 	<!-- {{variablePointDatas|log}} -->
    <el-table
      :data="variablePointDatas"
      style="width: 100%"
      ref="varTable"
      stripe
      v-if="!$_.isEmpty(variablePointDatas)"
      :cell-class-name="showEditorIcons"
      >
       <el-table-column
        :label="head.display"
        width="130"
        v-for="(head, index) in isShowTheadName(theaderDatas)"
        v-if="head.name == 'force_value_display'"
        :key="head.name"
        type="index"
        >
        <template slot-scope="scope" v-loading="dataLoading">
        	<p class="dcs-text-force">{{getForceVal(scope.row.point_name)}} <i class="el-icon-edit m-l-30" @click="isEditorClick(scope.row.point_name)"></i></p>
        	<p v-if="isEditor&&currentPointName == scope.row.point_name" class="dcs-editor-force">
        		<el-form :model="forceForm" :rules="rules" ref="forceForm">
						  <el-form-item label="" prop="forceVal">
						    <input :placeholder="getForceVal(scope.row.point_name)" class="dcs-input-style" v-focus :id="'forceForm_'+scope.$index" :value="getForceVal(scope.row.point_name)" @keyup.blur="submitForceData('forceForm',$event,scope.$index)" @keyup.enter="submitForceData('forceForm',$event,scope.$index)"></input>
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
        width="150"
        v-for="head in isShowTheadName(theaderDatas)"
        v-if="head.name != 'force_value_display' && head.name != 'current_value_display'"
        :key="head.name"
        >
      </el-table-column>
    </el-table>
    <div v-else class="dcs-no-data"><i class="el-icon-loading"></i>暂无数据！</div>
    <newBuildGroup :variable-point-datas="variablePointDatas"></newBuildGroup>
 </div>
</template>
<script>
 import types from "../../store/project/types";
 import {mapGetters} from "Vuex";
 export default{
 	name:'variablePointTable',
 	data(){
 		return {
 			dataLoading:false,
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
 				assocs:'&',
 				forceRdata:{},
 			},
 			searchReasultDatas:null,
 			currentPointName:null,
 			forceValueDatas:null,
 			currentValueDatas:null,
 			forceForm:{
 				forceVal:null,
 			},
 			forceParams:{},
 			assocs:[
	 			{value: '|', label: 'Or'},
	 			{value: '&', label: 'And'}
 			],
 			isResetCurrentGroup:false,
 			newGroupName:null,
 			rules: {
            forceVal: [
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
      variablePointDatas(){
      	let vm = this
      	let filterData = []
      	if(!vm.$_.isEmpty(vm.searchReasultDatas)){
      		vm.searchReasultDatas.forEach(item=>{
      			filterData.push( vm.variablePointData.filter(obj=>{ return item == obj.point_name }) )
      		})
		 			return vm.$_.compact(vm.$_.flatten(filterData))
      	}else{
      		return vm.variablePointData
      	}
      	
	 		},

    },
 	props:['variablePointData'],
 	directives:{
 		focus:{
 			// 指令的定义
	    inserted: function (el) {
	      el.focus()
	    }
 		}
 	},
 	created(){
 		let vm = this;
 		vm.searchDataResult()
		vm.initTableHeader()
 		vm.initCurrentVal()
 		vm.initForceVal()

 		vm.$watch('forceForm.forceVal', ()=>{
 			vm.initForceVal()
 		})

 		

 		/**
 		 * @Author      supper520love@126.com
 		 * @DateTime    2018-04-18
 		 * @description [是否取消当前组强制]
 		 * @return      {[booler]}                  [true]
 		 */
 		vm.$bus.$on('resetCurrentGroutPoint', msg=>{
 			if(msg){
 				vm.$confirm('此操作将永久重置当前强制组强制值, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	        	this.resetForceValueClick()
	        }).catch(() => {
	          vm.$message({
	            type: 'info',
	            message: '已取消操作'
	          });
	        });
 			}
 		})

 		/**
 		 * 保存新组校验执行权限
 		 */
 		vm.$bus.$emit('isNewBuildGroupPromit', true)
 		/**
 		 * 取消当前组权限校验
 		 */
 		vm.$bus.$emit('resetCurrentPointPromit', true)
 	},

 	methods:{
 		searchDataResult(){
 			let vm = this
 			let url = 'point/search'
 			let paramsVal = `${vm.filter.column}=${vm.filter.columVal}${vm.filter.assocs}${vm.filter.column2}=${vm.filter.columVal2}`
 			let params = {
 				query: paramsVal
 			}
 			// console.log(params);
 			vm.$axios.get(url,{params}).then(response=>{
 				if(response.status == 200){
 					vm.searchReasultDatas = response.data.data
	 			}else{
	 					vm.$message.error('检索请求失败！')
	 				}
	 			}).catch(response=>{
	 				vm.$message.error('检索请求请求有误！')
	 			})
 		},

 		isEditorClick(val){
 			let vm = this;
 			// vm.isEditorTxt = false
 			vm.currentPointName = val
 			vm.isEditor = true
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
 			let pointName = vm.variablePointDatas.map(item=>{return item.point_name})
 			vm.$axios.post(url, {
 				'point_name': pointName
 			}).then(response=>{
 				if(response.status == 200){
 					vm.currentValueDatas = response.data.value
 				}else{
 					vm.$message.error('获取当前值失败！')
 				}
 			}).catch(response=>{
 				vm.$message.error('获取当前值请求有误！')
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
 					return 'null'
 				}
 			}else{
 			  return 'null'
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
 		/**
 		 * @Author      supper520love@126.com
 		 * @DateTime    2018-04-18
 		 * @description [获取强制值]
 		 * @return      {[对应point_name的强制值]}
 		 */
 		initForceVal(){
 			let vm = this
 			let url = '/point/force/value'
 			let pointName = vm.variablePointDatas.map(item=>{return item.point_name})
 			let params = {
 				point_name: pointName
 			}
 			vm.$axios.post(url, params).then(response=>{
 				if(response.status == 200){
 					vm.forceValueDatas = response.data.value
 				}
 			})
 		},
 		/**
 		 * @Author      supper520love@126.com
 		 * @DateTime    2018-04-17
 		 * @description [匹配强制值]
 		 * @param       {[point_name]}              val [点name]
 		 */
 		getForceVal(val){
 			let vm = this
 			if(vm.$_.indexOf(vm.forceValueDatas, val) != -1){
 				if(!vm.$_.isEmpty(vm.forceValueDatas[val])){
 					return vm.forceValueDatas[val]
 				}else{
 					return 'null'
 				}
 			}else{
 			  return 'null'
 			}
 		},
 		/**
 		 * @Author      supper520love@126.com
 		 * @DateTime    2018-04-17
 		 * @description [设置强制变量]
 		 * @param       {[表单]}              formName [description]
 		 * @return      {[value]}                       [设置后的值 ]
 		 */
 		submitForceData(formName, e, index){
 			let vm = this
 			let url = '/point/force'
 			vm.forceForm.forceVal = document.getElementById(e.target.id).value
 			vm.forceParams[vm.currentPointName] = vm.forceForm.forceVal
		  vm.dataLoading = true
      vm.$axios.post(url, vm.forceParams).then(response=>{
 				if(response.status == 200){
 					vm.isEditorTxt = false
 					vm.isEditor = false
 					vm.dataLoading=false
 				}else{
 					vm.dataLoading=false
 					vm.$message.error('设置强制值失败！')
 				}
 			}).catch(response=>{
 				vm.dataLoading = false
 				vm.$message.error('设置强制值请求失败！')
 			})
 		},
 		showEditorIcons({row, column, rowIndex, columnIndex}){
 			let vm = this
 			if(columnIndex == 0){
 				return 'dcs-show-editor-tool';
 			}else if(columnIndex == 0 && vm.getForceVal(row.point_name) == null) {
 				return 'dcs-show-editor-tool dcs-has-val';
 			}
 			if(columnIndex == 1 && vm.getCurrentVal(row.point_name) == null){
 				return 'dcs-has-val';
 			}
	 	},

	 	resetForceValueClick(){
	 		let vm = this,
	 		    url= '/point/force',
	 		    paramsDatas = {}
	 	  vm.variablePointDatas.map((item) =>{
	 	  	vm.forceForm.forceVal = 'null'
	 		 	 return paramsDatas[item.point_name] = 'null'
	 		  })
	 	  vm.$axios.post(url, paramsDatas).then(response =>{
	 	  	if(response.status == 200){
	 	  		vm.$message.success('当前组取消重置强制成功！')
	 	  	}
	 	  })
	 	},

	 
 	},

 	components:{
 		newBuildGroup: resolve => require(['./newBuildGroup.vue'], resolve),
 	},

 }
</script>
<style scope="sass">
.el-table{
	padding: 1.5rem;
}
</style>