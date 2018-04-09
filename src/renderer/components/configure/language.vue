<template>
 <div>
 	<el-dialog title="语言" width="40%":visible.sync="dialogLanguageVisible">
      <el-form :model="addParamFrom" status-icon   label-width="100px" ref="addParamFrom"  class="demo-ruleForm">
			 
			  <el-form-item label="选择语言" prop="dataFrom">
           <el-select v-model="addParamFrom.language" placeholder="请选择">
              <el-option
                v-for="item in languages"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('addParamFrom')">确认</el-button>
			  </el-form-item>
			</el-form>
	</el-dialog>
 </div>
</template>
<script>
    export default {
    name:'language',
    data() {
      return {
      	status:{
      		dialogUserVisible:false,
      	},
        isGoOnVal:null,
     

        languages: [{
          value: '1',
          label: 'en'
        }, {
          value: '2',
          label: 'zh_CN'
        }],
       
        dialogLanguageVisible: false,
        addParamFrom: {
          language: ''
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
      vm.$bus.$on('language', (msg) => {
         vm.dialogLanguageVisible = msg
       })
    },

  };
</script>