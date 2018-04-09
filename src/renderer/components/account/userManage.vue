<template>
 <div>
 	<el-dialog title="用户管理" :visible.sync="dialogTableVisible">
 		<p class="dialogButtonBox"><el-button type="primary" size="mini" @click="status.dialogUserVisible = true">新建用户</el-button></p>
	  <el-table :data="userData">
	    <el-table-column property="num" label="序号" width="150"></el-table-column>
	    <el-table-column property="user_name" label="用户名" width="200"></el-table-column>
	    <el-table-column property="name" label="名称"></el-table-column>
	    <el-table-column property="group" label="所属组"></el-table-column>
	  </el-table>
	  <el-dialog
      width="30%"
      title="添加账户"
      :visible.sync="status.dialogUserVisible"
      append-to-body>
      <el-form :model="addUserFrom" status-icon :rules="rules2" ref="addUserFrom" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="用户名" prop="username">
			    <el-input type="text" v-model="addUserFrom.username" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="名称" prop="name">
			    <el-input type="text" v-model="addUserFrom.name" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="密码" prop="pwd">
			    <el-input type="password" v-model="addUserFrom.pwd" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="用户组">
			     <el-select v-model="groupValue" placeholder="请选择">
					    <el-option
					      v-for="item in groupOptions"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('addUserFrom')">提交</el-button>
			    <el-button @click="resetForm('addUserFrom')">重置</el-button>
			  </el-form-item>
			</el-form>
    </el-dialog>
	</el-dialog>
 </div>
</template>
<script>
    export default {
    data() {
    	var checkUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
      };
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('名称不能为空'));
        }
      };
      var checkGroup = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('组名称不能为空'));
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.addUserFrom.pwd !== '') {
            this.$refs.addUserFrom.validateField('pwd');
          }
          callback();
        }
      };
      return {
      	status:{
      		dialogUserVisible:false,
      	},
        groupValue:null,
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
        userData: [{
          num: '2',
          user_name: '王小虎',
          name:'234',
          group: 'guest'
        }, {
          num: '3',
          user_name: '王小虎',
          name:'123',
          group: 'administrator'
        }, {
          num: '3',
          user_name: '王小虎',
          name:'123',
          group: 'administrator'
        }, {
          num: '3',
          user_name: '王小虎',
          name:'123',
          group: 'administrator'
        }],
        dialogTableVisible: false,
        addUserFrom: {
          username: '',
          name:'',
          pwd: '',
          group: ''
        },
        rules2: {
          username: [
            { validator: checkUsername, trigger: 'blur' }
          ],
          pwd: [
            { validator: validatePass, trigger: 'blur' }
          ],
          name: [
            { validator: checkName, trigger: 'blur' }
          ],
          group: [
            { validator: checkGroup, trigger: 'blur' }
          ]
        }
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
       vm.$bus.$on('userManage', (msg) => {
         vm.dialogTableVisible = msg
       })
    },
  };
</script>