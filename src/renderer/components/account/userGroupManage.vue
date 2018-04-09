<template>
 <div>
 	<el-dialog title="用户组管理" :visible.sync="dialogTableVisible">
 		<p class="mb20 tar"><el-button type="primary" size="mini" @click="status.dialogUserVisible = true">新建用户</el-button></p>
	  <el-table :data="userGroupData">
	    <el-table-column property="num" label="序号" width="150"></el-table-column>
	    <el-table-column property="groutName" label="组名称" width="200"></el-table-column>
	    <el-table-column property="member" label="成员"></el-table-column>
	    <el-table-column property="description" label="组描述"></el-table-column>
	  </el-table>
	  <el-dialog
      width="50%"
      title="内层 Dialog"
      :visible.sync="status.dialogUserVisible"
      append-to-body>
      <el-form :model="addUserGroupFrom" status-icon  ref="addUserGroupFrom" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="用户组名" prop="groutName">
			    <el-input type="text" v-model="addUserGroupFrom.groutName" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="用户描述" prop="description">
			    <el-input type="text" v-model="addUserGroupFrom.description" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('addUserGroupFrom')">提交</el-button>
			    <el-button @click="resetForm('addUserGroupFrom')">重置</el-button>
			  </el-form-item>
			</el-form>
    </el-dialog>
	</el-dialog>
 </div>
</template>
<script>
    export default {
    data() {
    	var groutName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('组名称不能为空'));
        }
      };
      return {
      	status:{
      		dialogUserVisible:false,
      	},
      	groupOptions: [{
          value: '1',
          label: 'administrator'
        }, {
          value: '2',
          label: 'guest'
        }, {
          value: '选项3',
          label: 'administrator'
        }],
        userGroupData: [{
          num: '2016-05-02',
          groutName: '王小虎',
          member:'234',
          description: 'guest'
        }, {
          num: '2016',
          groutName: '王小虎',
          member:'123',
          description: 'administrator'
        }, {
          num: '2016',
          groutName: '王小虎',
          member:'123',
          description: 'administrator'
        }, {
          num: '2016',
          groutName: '王小虎',
          member:'123',
          description: 'administrator'
        }],
        dialogTableVisible: false,
        addUserGroupFrom: {
          groutName: '',
          description:''
        },
      }
    },
    methods:{
    	submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted(){
      let vm = this
       vm.$bus.$on('userGroupManage', (msg) => {
         vm.dialogTableVisible = msg
       })
    },

  };
</script>