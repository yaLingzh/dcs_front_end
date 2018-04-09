<template>
 <div>
 	<el-table
		    :data="testListData"
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
 </div>
</template>
<script>
 export default{
 	name: 'testTable',
 	data(){
 		return{

 		}
 	},
 	props:['testListData'],
 }
</script>