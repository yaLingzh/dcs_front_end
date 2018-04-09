<template>
 <div>
 	<el-dialog title="日志列表" width="57%" :visible.sync="dialogLogVisible">
 		<div class="grid-middle-content test-record-content">
       <el-form ref="form" :inline="true" :model="reportDataFrom" class="demo-form-inline">
          <el-form-item label="类型">
            <el-select v-model="reportDataFrom.type" placeholder="全部" size="8">
              <el-option label="规程" value="shanghai"></el-option>
              <el-option label="用例组" value="beijing"></el-option>
            </el-select>
          </el-form-item>
            <el-form-item label="编号/名称">
              <el-input v-model="reportDataFrom.name" size="22"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">搜索</el-button>
            </el-form-item>
            </el-form>
            <template>
                <el-table
                  :data="reportData"
                  height="350"
                  border
                  header-cell-class-name="tableHead"
                  style="width: 100%">
                  <el-table-column
                    prop="num"
                    label="编号"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="testType"
                    label="测试类型">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="编号/名称"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="startTime"
                    label="开始时间">
                  </el-table-column>
                  <el-table-column
                    prop="overTime"
                    label="结束时间">
                  </el-table-column>
                  <el-table-column
                    prop="successRate"
                    label="成功率">
                  </el-table-column>
                   <el-table-column
                      prop="operator"
                      label="操作人员">
                    </el-table-column>
                  </el-table>
                </el-table>
               
              </template>
     </div>
	</el-dialog>
 </div>
</template>
<script>
    export default {
    	name:'testRecord',
      data() {
      return {
      	reportDataFrom:{
          name:null,
          type:null,
        },
        reportData: [{
          num:'123443',
          testType:'规程',
          startTime:'234231',
          overTime:'是',
          successRate: '2016-05-03',
          name: '王小虎',
          operator: '小五'
        }, {
          num:'123443',
          testType:'规程',
          startTime:'234231',
          overTime:'是',
          successRate: '2016-05-02',
          name: '王小虎',
          operator: '小五'
        }, {
          num:'123443',
          testType:'规程',
          startTime:'234231',
          overTime:'是',
          successRate: '2016-05-04',
          name: '王小虎',
          operator: '小五'
        }, {
          num:'123443',
          testType:'规程',
          startTime:'234231',
          overTime:'是',
          successRate: '2016-05-01',
          name: '王小虎',
          operator: '小五'
        }, {
          num:'123443',
          testType:'规程',
          startTime:'234231',
          overTime:'是',
          successRate: '2016-05-08',
          name: '王小虎',
          operator: '小五'
        }, {
          num:'123443',
          testType:'规程',
          startTime:'234231',
          overTime:'是',
          successRate: '2016-05-06',
          name: '王小虎',
          operator: '小五'
        }, {
          num:'123443',
          testType:'规程',
          startTime:'234231',
          overTime:'是',
          successRate: '2016-05-07',
          name: '王小虎',
          operator: '小五'
        }],
        dialogLogVisible: false,
      
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
       vm.$bus.$on('log', (msg) => {
         vm.dialogLogVisible = msg
       })
    },

  };
</script>