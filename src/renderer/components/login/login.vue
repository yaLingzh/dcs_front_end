<template>
 <div>
 	<el-dialog
      title="用户登录"
		  :visible.sync="dialogVisibleLogin"
      :close-on-click-modal="false"
		  width="25%"
		  >
		  <div style="padding:3rem 0 0;">
		  	<el-form :model="loginForm" :rules="loginRule" ref="loginForm" label-width="100px" class="demo-ruleForm">
		  		<el-form-item label="用记名" prop="userName">
				    <el-input type="text" v-model="loginForm.userName" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="密码" prop="pass">
				    <el-input type="password" v-model="loginForm.pass" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" >游客</el-button>
				    <el-button @click="submitForm('loginForm')">登录</el-button>
				  </el-form-item>
				</el-form>
		  </div>
  </el-dialog>
 </div>
</template>
<script>
  import types from "../../store/project/types";
  import {mapGetters } from "vuex";
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (!value) {
           callback(new Error('请输入密码'));
        }else{
          callback()
        }
      };
       var checkName = (rule, value, callback) => {
        if (!value) {
           callback(new Error('用户名不能为空！'));
        }else{
          callback()
        }
      };
      return {
      	dialogVisibleLogin: true,
        loginForm: {
          pass: '',
          userName: ''
        },
        loginRule: {
          userName: [
            { validator: checkName, trigger: 'blur' },
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
        }
      };
    },
    computed:{
    ...mapGetters({
        vxGlobal_isLogged: types.GETTERS.isLogged,
      }),
  },
    created(){
      let vm = this
      if(vm.vxGlobal_isLogged){
        vm.dialogVisibleLogin = false
      }
    },
    methods: {
      submitForm(formName) {
        let vm = this
        vm.$refs[formName].validate((valid) => {
          if (valid) {
            vm.dialogVisibleLogin=false
            vm.$bus.$emit('historyprojectbox', true);
            vm.$store.commit(types.MUTATIONS.setLoginData, {
              'userName': vm.loginForm.userName,
              'userPass': vm.loginForm.pass
            })
          } else {
            vm.$message.warning('请输入用户名与密码！')
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>