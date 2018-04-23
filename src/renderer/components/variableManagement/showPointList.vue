<template>
 <div>
 	  <el-dialog
      title="变量列设置"
      :visible.sync="status.dialogPointListVisible"
      :center="true"
      append-to-body>
      <template>
        <p> <el-checkbox :indeterminate="isIndeterminate" v-model="checkVariableAll" @change="handleCheckVariableAllChange">全选</el-checkbox></p>
        <!-- <div></div> -->
        <div class="variableListbox">
          <el-checkbox-group v-model="checkedVariable"  @change="handleCheckedVariableChange">
            <el-checkbox v-for="variable in variableSettingAllData" disabled v-if="variable.fixed" checked :label="variable.display" :key="variable.display">{{variable.display}}</el-checkbox>
            <el-checkbox v-for="variable in variableSettingAllData" v-if="!variable.fixed" :label="variable.display" :key="variable.display">{{variable.display}}</el-checkbox>
          </el-checkbox-group>
        </div>
       </template>
       <div slot="footer" class="dialog-footer">
			    <el-button @click="resetVariableList">取 消</el-button>
			    <el-button type="primary" @click="selectedVariableList">设置</el-button>
			  </div>
    </el-dialog>
 </div>
</template>
<script>
  import types from "../../store/project/types";
  import {mapGetters} from "Vuex";
	export default{
		name:'variableShowList',
		data(){
			return {
        status:{
          dialogPointListVisible:false,
        },
        checkVariableAll: true,
        checkedVariable: [],
        isIndeterminate: false,
				variableSettingData:null,
        variableSettingAllData:null,
        variableFixedData:null,
			}
		},
    computed:{
      ...mapGetters({
        // 当前已选子强制点
        submittedPointeList: types.GETTERS.submittedPointeList,
      }),
    },
		created(){
      let vm = this
      vm.checkedVariable = vm.submittedPointeList
      vm.initVariableSettingData();
       vm.$bus.$on('showList', (msg) => {
         vm.status.dialogPointListVisible = msg
       })
    },

		methods:{
      initVariableSettingData(){
        let vm = this,
            url = '/point/column'
        vm.$axios.get(url).then(response=>{
          if(response.status == 200){
            vm.variableSettingAllData = response.data.data
            vm.variableFixedData = response.data.data.map(item=>{ if(item.fixed){ return item.display} })
            vm.variableSettingData = response.data.data.map(item=>{return item.display})
            if(vm.submittedPointeList){
              vm.checkedVariable = vm.submittedPointeList
            }else{
              vm.checkedVariable = vm.variableSettingData
            }
            vm.$store.commit(types.MUTATIONS.setVariablePointListData, response.data.data)
          }else{
            vm.$message.error('获取设置列表失败！')
          }
        })
      },
			/*选择*/
       handleCheckVariableAllChange(val) {
        let vm = this
        vm.checkedVariable = val ? vm.variableSettingData : vm.$_.compact(vm.variableFixedData);
        vm.isIndeterminate = false;
      },
      handleCheckedVariableChange(value) {
        let vm = this

        let checkedCount = value.length;
        vm.checkVariableAll = checkedCount === vm.variableSettingData.length;
        vm.isIndeterminate = checkedCount > 0 && checkedCount < vm.variableSettingData.length;
      },
      /*取消设置列表*/
      resetVariableList(){
        let vm = this;
        vm.checkedVariable = [];
        vm.status.dialogPointListVisible = false;
      },
      /*选中设置的列表值*/
      selectedVariableList(){
        let vm = this
        vm.$store.commit(types.MUTATIONS.setSubmittedPointeList, vm.checkedVariable)
        vm.status.dialogPointListVisible = false;
      },
		},
	}

</script>