<template>
 <div>
 	<el-dialog title="用户组管理" :visible.sync="dialogTableVisible">
 		<p class="mb20 tar"><el-button type="primary" size="mini" @click="status.dialogUserVisible = true">新建用户</el-button></p>
	  <el-table :data="userGroupData" @selection-change="handleSelectionChange">>
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
	    <el-table-column type="index" label="序号" width="150"></el-table-column>
	    <el-table-column property="name" label="组名称" width="200"></el-table-column>
	    <el-table-column property="detail" label="组描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="deleteAccountsData(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
	  </el-table>
	  <el-dialog
      width="30%"
      title="创建用户组"
      :visible.sync="status.dialogUserVisible"
      append-to-body>
      <el-form :model="addUserGroupFrom" status-icon :rules="addAccountRules"  ref="addUserGroupFrom" label-width="100px" class="demo-ruleForm" v-loading="status.accountLoading">
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
          accountLoading: false,
      		dialogUserVisible:false,
      	},
      	userGroupData:{},
        dialogTableVisible: false,
        addUserGroupFrom: {
          groutName: '',
          description:''
        },
        accountSelection:[],
        addAccountRules:{
          groutName:[
           { required: true, message: '请输入用户组名称', trigger: 'blur' }
           // { min: 3,  message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        },
      }
    },
    methods:{
    	submitForm(formName) {
        let vm = this
        vm.$refs[formName].validate((valid) => {
          if (valid) {
            vm.status.accountLoading = true
            vm.buildAccountsData()
            vm.status.dialogUserVisible = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      initAccountsData(){
        let vm = this
        let url = 'account/group'
        vm.$axios.get(url).then(response=>{
          if(response.status == 200){
            vm.userGroupData = response.data.data

          }else{
            vm.$message.error('获取用户数据失败！')
          }
        }).catch(response=>{
          console.log('获取用户组数据请求失败！');
        })
      },
      buildAccountsData(){
        let vm = this
        let url = 'account/group'
        let params = {
          name:vm.addUserGroupFrom.groutName,
          detail:vm.addUserGroupFrom.description
        }
        vm.$axios.post(url, params).then(response=>{
          if(response.status == 200){
            vm.$message.success('用户组添加成功！')
            vm.userGroupData.push(response.data)
            vm.status.accountLoading = false
          }else{
            vm.$message.success('用户组添加失败！')
          }
        }).catch(response=>{
          console.log('添加用户组请求失败！');
        })

      },
      handleSelectionChange(val) {
        this.accountSelection = val;
      },
      deleteAccountsData(data){
        let vm = this
        let url = 'account/group'
        let params = {
          name: data.name
        }
        vm.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           vm.$axios.delete(url, {params}).then(response=>{
            if(response.status == 200){
              vm.$message.success('删除成功')
              vm.initAccountsData
            }else{
              vm.$message.success('删除失败')
            }
          }).catch(response=>{
            console.log('删除用户组请求失败！');
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
       
      },
    },
    mounted(){
      let vm = this
       vm.$bus.$on('userGroupManage', (msg) => {
         vm.dialogTableVisible = msg
       })
       vm.initAccountsData()
    },

  };
</script>