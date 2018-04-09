<template>
 <div>
 	<el-dialog title="参数设置" width="40%":visible.sync="dialogParamsVisible">
      <el-form :model="addParamFrom" status-icon   label-width="175px" ref="addParamFrom"  class="demo-ruleForm">
			  <el-form-item label="规程运行配置（单位ms）" prop="toConfigure">
			    <el-input type="text" v-model="addParamFrom.to_configure" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="执行数据来源" prop="dataFrom">
           <el-select v-model="addParamFrom.data_from" placeholder="请选择">
              <el-option
                v-for="item in dataFroms"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
			  </el-form-item>
			  <el-form-item label="规程不通过是否断续运行">
           <el-select v-model="addParamFrom.is_goon" placeholder="请选择">
              <el-option
                v-for="item in isgoOnData"
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
    data() {
      return {
      	status:{
      		dialogUserVisible:false,
      	},
        isGoOnVal:null,
      	isgoOnData: [{
          value: 'YES',
          label: '是'
        }, {
          value: 'NO',
          label: '否'
        }],

        dataFroms: [{
          value: '3',
          label: '随机模式'
        }, {
          value: '4',
          label: '调试工装（modbus）'
        },{
          value: '5',
          label: '仿真模型'
        },{
          value: '6',
          label: '实时数据库（MNET）'
        }],
       
        dialogParamsVisible: false,
        addParamFrom: {
          to_configure: '',
          is_goon:'',
          data_from: '',
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
      vm.$bus.$on('parameterSetting', (msg) => {
         vm.dialogParamsVisible = msg
       })
    },

  };
</script>