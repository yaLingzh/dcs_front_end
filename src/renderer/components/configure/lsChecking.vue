<template>
 <div>
 	<el-dialog title="环境自检" :visible.sync="dialogNetWorkVisible">
 		<p class="dialogButtonBox"><el-button type="primary" size="mini" >开始自检</el-button></p>
	  <el-table :data="envDetectionData">
	    <el-table-column property="sort" label="序号" width="80"></el-table-column>
	    <el-table-column property="roll_call" label="点名"></el-table-column>
	    <el-table-column property="model_variable" label="模型变量"></el-table-column>
	    <el-table-column property="io" label="I/O"></el-table-column>
	    <el-table-column property="port" label="机箱/槽位置/端子"></el-table-column>
      <el-table-column property="ka" label="NI板板卡/通道"></el-table-column>
	  </el-table>
	</el-dialog>
 </div>
</template>
<script>
    export default {
    name:'lfChecking',
    data() {
      return {
      	status:{
      	},
      	
        envDetectionData: [{
          sort: '6',
          io:'10.120.23.15',
          roll_call:'123',
          model_variable:'90',
          port:'14',
          ka:'kda'
        }, {
          sort: '6',
          io:'10.120.23.15',
          roll_call:'123',
          model_variable:'90',
          port:'14',
          ka:'kda'
        }, {
          sort: '6',
          io:'10.120.23.15',
          roll_call:'123',
          model_variable:'90',
          port:'14',
          ka:'kda'
        }, {
          sort: '6',
          io:'10.120.23.15',
          roll_call:'123',
          model_variable:'90',
          port:'14',
          ka:'kda'
        }],
        dialogNetWorkVisible: false,
      
      }
    },
    methods:{
    
    },
    mounted(){
      let vm = this
      vm.$bus.$on('lsChecking', (msg) => {
         vm.dialogNetWorkVisible = msg
       })
    },

  };
</script>