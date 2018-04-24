<template>
 <div>
    <el-dialog
		  :title="title"
		  :close-on-click-modal="false"
		  :visible.sync="status.dialogVisibleProject"
		  width="30%"
		  >
		  <div class="pt30 ovh">
		  	 <el-table
		  	  v-if="!status.newBuildPro&&historyProjectData"
			    :data="historyProjectData"
			    border
			    style="width: 100%">
			    <el-table-column
			      prop="name"
			      label="名称"
			      width="120">
			    </el-table-column>
			    <el-table-column
			      fixed="right"
			      label="操作"
			      width="120">
			      <template slot-scope="scope">
			        <el-button  @click="openProClick(scope.row)" type="text" size="small">查看</el-button>
			        <el-button type="text" size="small"  @click="newBuildPro">新建</el-button>
			      </template>
			    </el-table-column>
			  </el-table>

		  	<el-form v-if="status.newBuildPro" :model="projectForm" status-icon :rules="rulesFrom" ref="projectForm" label-width="120px" class="demo-ruleForm">
				  <el-form-item label="请输入工程名" prop="name">
				    <el-input type="text" v-model="projectForm.name" placeholder="请输入项目名称"></el-input>
				  </el-form-item>
				  <el-form-item label="请选择工程路径" prop="path">
					    <el-input type="text" placeholder="请输入路径" style="width:100%" v-model="projectForm.path">
							    <template slot="append">
										  <el-button size="small" @click="browseFolder" type="primary">...</el-button>
							    </template>
							  </el-input>
				  </el-form-item>
				</el-form>
		  </div>
		  <span slot="footer" class="dialog-footer" v-if="status.newBuildPro">
		  	<el-button v-if="status.newBuildPro" @click="status.newBuildPro = false, title='工程列表'">返回</el-button>
		    <!-- <el-button @click="status.dialogVisibleProject = false">取 消</el-button> -->
		    <el-button type="primary" @click="submitForm('projectForm')">保存</el-button>
		  </span>
		</el-dialog>
 </div>
</template>
<script>
 import types from '../../store/project/types'
 import {mapGetters } from 'vuex';
 import {remote} from 'electron'
 import {getStorageDataAndDecode} from "../../util/common"
 // import  fs from 'fs'
 export default{
 	name:'engineering',
 	data(){
 		var checkProname = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('项目名不能为空'));
        }else{
        	callback()
        }
      };
    var checkPathName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('路径不能为空'));
        }else{
        	callback()
        }
      };
 		return {
 			status:{
 				dialogVisibleProject: false,
 				newBuildPro:false,
 				isDaoRuSuccess:null,
 			},
 			title:'工程列表',
			projectForm: {
				name:'',
				path:''
			},
			 rulesFrom: {
          name: [
            { validator: checkProname, trigger: 'blur' }
          ],
          path: [
            { validator: checkPathName, trigger: 'blur' }
          ],
        }
 		}
 	},
 	props:['historyProjectData'],
 	created(){
 		let vm = this
 		if(!vm.vxGlobal_curProject){
 			vm.status.dialogVisibleProject = true
 		}
 		vm.$bus.$on('historyprojectbox', (msg) => {
      vm.status.dialogVisibleProject = msg
    })
    vm.$bus.$on('daorusuccess', msg=>{
    	vm.status.isDaoRuSuccess = msg
    })
 	},
 	computed:{
    ...mapGetters({
        vxGlobal_curProject: types.GETTERS.curProject,
        vxGlobal_roles: types.GETTERS.roles,
      }),
  },
 	mounted(){
 		let vm = this
 		
 	},
 	methods:{
 		getStorageDataAndDecode,
 		newBuildPro(){
 			let vm = this
 			vm.status.newBuildPro = true
 			vm.title="创建项目"
 		},
 		browseFolder(e){
 			let vm = this
 			const {dialog} = remote
 			// 打开选择文件对话框,非模态
			  dialog.showOpenDialog(null , {
			    // 选择文件, 隐藏文件也显示出来
			    properties: ['openFile', 'openDirectory'], //showHiddenFiles  选择文件  showHiddenFiles 选择文件夹
			    // 后缀为html, js, json, md其中之一
			    // filters: [{
			    //   name: 'Text', 
			    //   extensions: ['html', 'js', 'json', 'md'] 
			    // }]
			  }, function(filenames) {
			    // filenames是一个数组, 每一项为选择的文件的绝对路径
			    if(vm.$_.isEmpty(filenames)){
			    	vm.$message.wraing('没有选择文件夹')
			    	return
			    }
			    let firstFile = filenames[0]
			    vm.projectForm.path = firstFile
			  });
 		},
 		beforeUpload(file){
 			let vm = this;
 			// vm.projectForm.name = file.name
 			vm.projectForm.path = file.path
 		},
 		//打开已经有项目
 		openProClick(obj){
 			let vm = this
 			let url = 'project/open'
 			let params = {
 				'path': obj.path,
 				'username': vm.vxGlobal_roles.userName,
 				'password': vm.vxGlobal_roles.userPass
 			}
 			vm.$axios.post(url, {params}).then(response=>{
 				if(response.status == 200){
 					let datas = response.data
 					vm.$bus.$emit('mainpageshowbox', true)
 					vm.$store.commit(types.MUTATIONS.setCurProjectDatas, datas)
 					vm.$store.commit(types.MUTATIONS.setTokenData, datas.token)
 					vm.status.dialogVisibleProject = false
 				}
 			})
 		},
 		submitForm(formName){
 			let vm = this
 			vm.$refs[formName].validate((valid) => {
 				if(valid){
 					let url = 'project/create'
		 			let params = {
		 				"name": vm.projectForm.name,
				    "path": vm.projectForm.path,
				    "username": vm.vxGlobal_roles.userName,
 			      "password": vm.vxGlobal_roles.userPass
		 			}
 					vm.$axios.post(url, {params}).then(response=>{
 						if(response.status == 200){
 							let datas =  response.data
 							// console.log(datas, 'datas');
 							vm.$bus.$emit('mainpageshowbox', true)
 							vm.$store.commit(types.MUTATIONS.setCurProjectDatas, datas)
		 					vm.$store.commit(types.MUTATIONS.setTokenData, datas.token)
 					    vm.status.dialogVisibleProject = false
 						}else{
 							vm.$message.error('项目创建失败,请重新创建并提交！')
 						}
 					})
 				}else{
 					return false
 				}
 			})
 		},
 		showUserLoginDialog(){

 		}
 	}
 }
</script>
