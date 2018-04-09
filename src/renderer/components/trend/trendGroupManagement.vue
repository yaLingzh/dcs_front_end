<template>
 <div>
      <p class="mb20 tar"><el-button type="primary" @click="status.dialogAddVisible = true" size="mini" >新建趋势组</el-button></p>
      <el-table :data="trendGroupData">
        <el-table-column property="sort" label="序号" width="80"></el-table-column>
        <el-table-column property="group_name" label="趋势组名称" width="150"></el-table-column>
        <el-table-column property="description" label="板卡型号/地址"></el-table-column>
      </el-table>
      <el-dialog
        width="20%"
        title="新建趋势组"
        :visible.sync="status.dialogAddVisible"
        append-to-body>
        <el-form :model="addTrendGroupFrom" status-icon :rules="rules" ref="formName" label-width="100px" class="demo-ruleForm">
          <el-form-item label="趋势组名" prop="group_name">
            <el-input type="text" v-model="addTrendGroupFrom.group_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="趋势组描述" prop="description">
            <el-input type="text" v-model="addTrendGroupFrom.description" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('addTrendGroupFrom')">提交</el-button>
            <el-button @click="resetForm('addTrendGroupFrom')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
 </div>
</template>
<script>
    export default {
    	name:'trendGroupManagement',
      data() {
      return {
      	status:{
          dialogAddVisible:false,
      	},
      	addTrendGroupFrom: {
          group_name: '',
          description:''
        },
        trendGroupData: [{
          group_name: '2016-05-02',
          sort: '12',
          description: 'guest'
        }, {
          group_name: '2016',
          sort: '12',
          description: 'administrator'
        }, {
          group_name: '2016',
          sort: '12',
          description: 'administrator'
        }, {
          group_name: '2016',
          sort: '12',
          description: 'administrator'
        }],

        rules: {
          group_name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          
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
    components:{
    }

  };
</script>