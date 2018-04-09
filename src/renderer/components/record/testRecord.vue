<template>
 <div>
 	 <div class="grid-content grid-bg-purple">
 	 	<p class="grid-middle-title">测试记录<em class="el-icon-minus"></em></p>
     <div class="grid-middle-content test-record-content">
     	 <el-form ref="form" :inline="true" :model="dataFrom" class="demo-form-inline">
     	 	  <el-form-item label="类型">
				    <el-select v-model="dataFrom.type" placeholder="全部" size="8">
				      <el-option label="区域一" value="shanghai"></el-option>
				      <el-option label="区域二" value="beijing"></el-option>
				    </el-select>
				  </el-form-item>
				   <el-form-item label="是否完成">
				    <el-select v-model="dataFrom.over" placeholder="全部" size="8">
				      <el-option label="区域一" value="shanghai"></el-option>
				      <el-option label="区域二" value="beijing"></el-option>
				    </el-select>
				    </el-form-item>
				    <el-form-item label="编号">
					    <el-input v-model="dataFrom.num" size="22"></el-input>
					  </el-form-item>
					  <el-form-item label="姓名">
					    <el-input  size="15" v-model="dataFrom.name"></el-input>
					  </el-form-item>
					  <el-form-item>
					    <el-button type="primary" @click="onSubmit">查询</el-button>
					  </el-form-item>
					  </el-form>
					  <template>
							  <el-table
							    :data="tableData3"
							    height="350"
							    border
							    header-cell-class-name="tableHead"
							    style="width: 100%">
							    <el-table-column
							      prop="num"
							      label="规程编号"
							      width="180">
							    </el-table-column>
							    <el-table-column
							      prop="name"
							      label="用例组名称"
							      width="180">
							    </el-table-column>
							    <el-table-column
							      prop="test_num"
							      label="用例编号">
							    </el-table-column>
							    <el-table-column
							      prop="is_over"
							      label="是否完成">
							    </el-table-column>
							    <el-table-column
							      prop="date"
							      label="测试时间">
							    </el-table-column>
							  </el-table>
							</template>
							<div class="tool-button-content"><el-button type="primary" size="mini">导出</el-button><el-button size="mini" type="primary">打开报告</el-button></div>
     </div>
 	 </div>
 </div>
</template>
<script>
 export default{
		name:'trend',
		data(){
			return {
				dataFrom:{
					name:null,
					type:null,
					over:null,
					num:null,
				},
				tableData3: [{
					num:'123443',
					test_num:'234231',
					is_over:'是',
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          num:'123443',
          test_num:'234231',
          is_over:'是',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          num:'123443',
          test_num:'234231',
          is_over:'是',
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          num:'123443',
          test_num:'234231',
          is_over:'是',
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          num:'123443',
          test_num:'234231',
          is_over:'是',
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          num:'123443',
          test_num:'234231',
          is_over:'是',
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          num:'123443',
          test_num:'234231',
          is_over:'是',
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
			}
		},
		methods:{
			 onSubmit() {
        console.log('submit!');
      }
		},

  }
</script>
<style scoped="scoped">
 .tableHead{
 	text-align: center;
 }
</style>