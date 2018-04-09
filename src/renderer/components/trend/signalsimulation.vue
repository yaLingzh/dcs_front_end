<template>
 <div>
 	<el-dialog title="信号仿真" :visible.sync="dialogTimeVisible">
 		<div class="response-container">
 			<div class="response-left">
 			<p class="pop-title"><em class="el-icon-setting"></em>信号仿真</p>
 			<siginal-echarts :width="width" :height="height"></siginal-echarts>
 		</div>
 		<div class="response-right">
 			<p class="pop-title"><em class="el-icon-circle-check-outline"></em>采样率（1到250单位KHz）</p>
 			<p class="mb20"><el-input v-model="samplingRate" placeholder="请输入内容"></el-input></p>
 			<el-table :data="siginalData">
          <el-table-column property="passageway" label="通道" width="80"></el-table-column>
          <el-table-column property="wave_type" label="波型"></el-table-column>
          <el-table-column property="frequency" label="频率"></el-table-column>
      </el-table>
 		</div>
 		</div>
		</el-dialog>
 </div>
</template>

<script>
	const siginalData =[{
          wave_type: '2016-05-02',
          passageway: '12',
          frequency: 'guest'
        }, {
          wave_type: '2016',
          passageway: '12',
          frequency: 'administrator'
        }, {
          wave_type: '2016',
          passageway: '12',
          frequency: 'administrator'
        }, {
          wave_type: '2016',
          passageway: '12',
          frequency: 'administrator'
        }]
  export default {
    data() {
      return {
        width:100,
        height:400,
      	siginalData: siginalData,
      	dialogTimeVisible:false,
        samplingRate:'',
      }
    },
    methods: {
    },
    mounted(){
      let vm = this
       vm.$bus.$on('signalsimulation', (msg) => {
         vm.dialogTimeVisible = msg
       })
    },
    components:{
    	siginalEcharts: resolve => require(['./signalEcharts.vue'], resolve),
    },
  }
</script>