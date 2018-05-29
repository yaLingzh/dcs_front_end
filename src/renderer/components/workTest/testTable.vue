<template>
 <div>
 	<el-table
		    :data="tableListData"
		    height="450"
		    border
		    header-cell-class-name="tableHead"
		    style="width: 100%">
		    <el-table-column
		      prop="number"
		      label="规程编号"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="用例组名称"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="number"
		      label="用例编号">
		    </el-table-column>
		    <el-table-column
		      prop="is_complete"
		      label="是否完成">
		    </el-table-column>
		    <el-table-column
		      prop="run_time"
		      label="测试时间">
		    </el-table-column>
		     <el-table-column label="操作"  fixed="right">
		      <template slot-scope="scope">
		          <el-button
		          size="mini"
		          type="primary"
		          @click="getRow(scope.$index, tableListData)">运行</el-button>
		      </template>
		    </el-table-column>
		  </el-table>
 </div>
</template>
<script>
 export default{
 	name: 'testTable',
 	data(){
 		return{
 			isDcsRun:false,
 		}
 	},
 	props:['tableListData'],
 	created(){
 		let vm = this
 		vm.$bus.$on('isCurrentDcsRun', msg=>{
 			console.log(msg, 'msg')
 			vm.isDcsRun = msg
 			console.log(vm.isDcsRun, 'isDcsRun')
 		})
 	},
 	methods:{
 		deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    getRow(index,rows){
    	let vm = this
    	let rowDatas = {
    		id:rows[index].number,
        label:rows[index].number,
        number:rows[index].number,
        obj_type: rows[index].procedure,
        level: 1,
    		run_uuid: rows[index].run_uuid,
    		currentLevel:null,
    		isStopData:true
    		// children:[
    		//   {
    		//   	id:'children_stop_' + (index+1),
    		//   	currentLevel: rows[index].procedure,
    		//   	label:rows[index].number,
    		//   	number:rows[index].number,
    		//   	level:2,
    		//   }
    		// ]
    	}
    	
    	if(vm.isDcsRun){
    		vm.$confirm('当前有规程在运程，如果恢复选中规程，请关闭正在运程的规程！是否关闭当前运行的规程?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	vm.$bus.$emit('stopRun', true) //停止运行当前规程
          vm.$bus.$emit('stopDcsListShow', false) //中止规程列表层隐藏
          vm.$nextTick(()=>{
          	vm.$message({
	            type: 'success',
	            message: '中止当前规程运程成功！'
	          });
          })
        }).catch(() => {
          vm.$message({
            type: 'info',
            message: '已关闭'
          });          
        });
        
    	}else{
    		vm.$bus.$emit('currentRunDcs', rowDatas)
    	}
    	
    },

 	}
 }
</script>