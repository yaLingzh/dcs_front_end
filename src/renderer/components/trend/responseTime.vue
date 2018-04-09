<template>
 <div>
 	<el-dialog title="快速响应测试模块" :visible.sync="dialogTimeVisible">
 		<div class="response-container">
 			<div class="response-left">
 			<p class="pop-title"><em class="el-icon-setting"></em>通道设置</p>
 			<el-form ref="form" :inline='true' class="demo-form-inline pop-from-box" :model="settingform" label-width="130px">
			  <el-form-item label="触发通道">
			    <el-input size="8" v-model="settingform.passageway"></el-input>
			  </el-form-item>
			  <el-form-item label="停止通道">
			    <el-select size="5" v-model="settingform.stopChannel" placeholder="请选择通道">
			      <el-option label="模拟" value="moni"></el-option>
			      <el-option label="干节点" value="hot"></el-option>
			      <el-option label="湿节点" value="shi"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="AI 开始值">
			  	<div class="pop-fl">
			  		<el-select size="5" v-model="settingform.aiStartValueSelect" placeholder="请选择值">
				      <el-option label="小于" value="small"></el-option>
				      <el-option label="大于" value="big"></el-option>
				      <el-option label="等于" value=""></el-option>
				    </el-select>
			  	</div>
			  	<div class="pop-fr">
			  		<el-input size="25" v-model="settingform.aiStartValue"></el-input><i class="pop-tip">mA</i>
			  	</div>
			    
			    
			  </el-form-item>
			  <el-form-item label="AI 停止值">
			  	<div class="pop-fl">
			  		<el-select size="5" v-model="settingform.aiStopValueSelect" placeholder="请选择值">
			      <el-option label="小于" value="small"></el-option>
			      <el-option label="大于" value="big"></el-option>
			      <el-option label="等于" value=""></el-option>
			    </el-select>
			  	</div>
			  	<div class="pop-fr">
			  		<el-input size="25" v-model="settingform.aiStopValue"></el-input><i class="pop-tip">mA</i>
			  	</div>
			  </el-form-item>
			  <el-form-item label="AO 起始值">
			    <div class="relative"><el-input size="42" v-model="settingform.aoStartValue"></el-input><i class="pop-tip">mA</i></div>
			  </el-form-item>
			  <el-form-item label="DO Dry 开始">
			     <el-select size="5" v-model="settingform.doDryStart" placeholder="请选择值">
			      <el-option label="断开" value="open"></el-option>
			      <el-option label="闭合" value="close"></el-option>
			    </el-select>
			  </el-form-item>
 		    <el-form-item label="DO Dry 开始沿变">
			     <el-select size="5" v-model="settingform.doDryStartAlong" placeholder="请选择值">
			      <el-option label="断开" value="open"></el-option>
			      <el-option label="闭合" value="close"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="DO Dry 停止沿变">
			     <el-select size="5" v-model="settingform.doDryStopAlong" placeholder="请选择值">
			      <el-option label="闭合-断开" value="open"></el-option>
			      <el-option label="断开-闭合" value="close"></el-option>
			    </el-select>
			  </el-form-item>

			  <el-form-item label="DO Wet 开始">
			     <el-select size="5" v-model="settingform.doWetStart" placeholder="请选择值">
			      <el-option label="OV" value="open"></el-option>
			      <el-option label="24V" value="close"></el-option>
			    </el-select>
			  </el-form-item>
 		    <el-form-item label="DO Wet 开始沿变">
			     <el-select size="5" v-model="settingform.doWetStartAlong" placeholder="请选择值">
			      <el-option label="OV" value="open"></el-option>
			      <el-option label="24V" value="close"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="DO Wet 停止沿变">
			     <el-select size="5" v-model="settingform.doWetStop" placeholder="请选择值">
			      <el-option label="0V-24V" value="open"></el-option>
			      <el-option label="24V-0v" value="close"></el-option>
			    </el-select>
			  </el-form-item>

			  <el-form-item label="IP 地址">
			    <el-input size="7" v-model="settingform.ipAddress"></el-input> 
			  </el-form-item>
			  <el-form-item label="模块温度">
			  	<div class="relative"><el-input size="7" v-model="settingform.moduleTemperature"></el-input><i class="pop-tip">(<sup>0</sup>C)</i></div>
			  </el-form-item>
			  <el-form-item label="超时时间">
			  	<el-input size="7" v-model="settingform.timeout"></el-input>
			  </el-form-item>
			  <el-form-item label="测试次数">
			  	<el-input size="7" v-model="settingform.testTimes"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="onSubmit">开始</el-button>
			  </el-form-item>
			</el-form>
 		</div>
 		<div class="response-right">
 			<p class="pop-title"><em class="el-icon-circle-check-outline"></em>测试结果</p>
 			<el-table :data="testResultData">
          <el-table-column property="id" label="ID" width="80"></el-table-column>
          <el-table-column property="response_time" label="响应时间"></el-table-column>
          <el-table-column property="status" label="状态"></el-table-column>
      </el-table>
 		</div>
 		</div>
		
		</el-dialog>
 </div>
</template>
<style>

</style>

<script>
	const groupPointData =[{
          response_time: '2016-05-02',
          id: '12',
          status: 'guest'
        }, {
          response_time: '2016',
          id: '12',
          status: 'administrator'
        }, {
          response_time: '2016',
          id: '12',
          status: 'administrator'
        }, {
          response_time: '2016',
          id: '12',
          status: 'administrator'
        }]
  export default {
    data() {
      return {
      	testResultData: groupPointData,
      	dialogTimeVisible:false,
        settingform: {
          passageway: '',
          stopChannel: '',
          aiStartValue: '',
          aiStartValueSelect:'',
          aiStopValueSelect:'',
          aiStopValue:'',
          aoStartValue:'',
          doDryStart:'',
          doDryStartAlong:'',
          doDryStopAlong:'',
          doWetStart:'',
          doWetStartAlong:'',
          doWetStop:'',
          ipAddress:'',
          moduleTemperature:'',
          timeout:'',
          testTimes:''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    },
    mounted(){
      let vm = this
       vm.$bus.$on('time', (msg) => {
         vm.dialogTimeVisible = msg
       })
    },
  }
</script>