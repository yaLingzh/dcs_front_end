<template>
 <div>
    <el-dialog
		  title="打开工程"
		  :visible.sync="dialogOpenProject"
		  width="25%"
		  >
		  <div style="padding:3rem 0 0;">
		  	<el-upload
					  class="upload-demo"
					  :show-file-list="false"
					  :before-upload="beforeUpload"
					  >
					  <el-button size="small" type="primary">...</el-button>
					</el-upload>
		  </div>
		</el-dialog>
 </div>
</template>
<script>
 export default{
 	name:'openProject',
 	data(){
 		return {
 			dialogOpenProject: false,
	   
 		}
 	},
 	created(){},
 	mounted(){
 		let vm = this
 		vm.$bus.$on('openProject', (msg) => {
      vm.dialogOpenProject = msg
    })
 	},
 	methods:{
 		beforeUpload(file){
 			let vm = this;
 			vm.projectForm.path = file.path
 		}
 	}
 }
</script>