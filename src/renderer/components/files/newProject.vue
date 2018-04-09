<template>
 <div>
    <el-dialog
		  title="创建工程"
		  :visible.sync="dialogVisibleProject"
		  width="25%"
		  >
		  <div style="padding:3rem 0 0;">
		  	<el-form  label-width="120px" :model="projectForm" >
			  <el-form-item label="请输入工程名">
			    <el-input v-model="projectForm.name" placeholder="请输入项目名称"></el-input>
			  </el-form-item>
			  <el-form-item label="请选择工程路径">
				    <el-input placeholder="请输入路径" style="width:31.5rem"v-model="projectForm.path">
						    <template slot="append">
						    	<el-upload
									  class="upload-demo"
									  :show-file-list="false"
									  :before-upload="beforeUpload"
									  >
									  <el-button size="small" type="primary">...</el-button>
									</el-upload>
						    </template>
						  </el-input>
			  </el-form-item>
			</el-form>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisibleProject = false">取 消</el-button>
		    <el-button type="primary" @click="dialogVisibleProject = false">保存</el-button>
		  </span>
		</el-dialog>
 </div>
</template>
<script>
 export default{
 	name:'engineering',
 	data(){
 		return {
 			dialogVisibleProject: false,
			projectForm: {
	      name: '',
	      path: ''
	    },
 		}
 	},
 	created(){},
 	mounted(){
 		let vm = this
 		vm.$bus.$on('newProject', (msg) => {
      vm.dialogVisibleProject = msg
    })
 	},
 	methods:{
 		beforeUpload(file){
 			let vm = this;
 			vm.projectForm.path = file.path
 			console.log(file);
 		}
 	}
 }
</script>