<template>
 <div>
 	  <el-dialog
      title="设置组名"
      :visible.sync="status.dialogBuildNameVisible"
      :center="true"
      append-to-body>
      <el-form :model="buildGroupNameForm" ref="buildGroupNameForm" label-width="100px" class="demo-dynamic">
			  <el-form-item
			    prop="groupName"
			    label="强制组名"
			    :rules="[
			      { required: true, message: '请输入组名', trigger: 'blur' },
			    ]"
			  >
			    <el-input v-model="buildGroupNameForm.groupName"></el-input>
			  </el-form-item>
			</el-form>
      <div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="submitForm('buildGroupNameForm')">提交</el-button>
			  <el-button @click="resetForm('buildGroupNameForm')">重置</el-button>
		  </div>
    </el-dialog>
 </div>
</template>
<script>
 export default{
 	name:'newBuildGroup',
 	data(){
 		return{
 			status:{
 				dialogBuildNameVisible:false,
 			},
 			buildGroupNameForm: {
          groupName: ''
        },
      veraibleTabs:{},
 		}
 	},
 	props:['variablePointDatas'],
 	created(){
 		let vm = this
 		vm.$bus.$on('newBuildGroutName', msg=>{
 			vm.status.dialogBuildNameVisible = msg
 		})
 	},
 	methods:{
 		initBuildGroup(){
	 		let vm = this,
	 		    url = 'point/groups',
	 		    point_names= vm.variablePointDatas.map(item=>{return item.point_name}),
	 		    params={
	 		    	group_name: vm.buildGroupNameForm.groupName,
	 		    	point_names: point_names
	 		    }
	 		vm.$axios.post(url, params).then(response=>{
	 			if(response.status == 200){
	 				vm.status.dialogBuildNameVisible = false

	 				vm.$bus.$emit('newGroupDataSuccess', true)
	 			}else{
	 				// vm.$bus.$emit('newGroupDataSuccess', false)
	 				vm.$message.error('新建组失败')
	 			}
	 		}).catch(response=>{
	 			console.log(response);
	 		})

	 	},
 		submitForm(formName) {
 			let vm = this
      vm.$refs[formName].validate((valid) => {
        if (valid) {
          vm.initBuildGroup()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
		resetForm(formName) {
      this.$refs[formName].resetFields();
    },
 	}
 }
</script>