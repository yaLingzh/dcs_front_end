<template>
 <div>
 	  <el-dialog
      title="变量列设置"
      :visible.sync="status.dialogListVisible"
      :center="true"
      append-to-body>
      <template>
        <p> <el-checkbox :indeterminate="isIndeterminate" v-model="checkVariableAll" @change="handleCheckVariableAllChange">全选</el-checkbox></p>
        <!-- <div></div> -->
        <div class="variableListbox">
          <el-checkbox-group v-model="checkedVariable" @change="handleCheckedVariableChange">
            <el-checkbox v-for="variable in variableSettingData" :label="variable" :key="variable">{{variable}}</el-checkbox>
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
	// const cityOptions = ['上海', '北京', '广州', '深圳'];
	export default{
		name:'showList',
		data(){
			return {
        status:{
          dialogListVisible:false,
        },
        checkVariableAll: false,
        checkedVariable: [],
        isIndeterminate: false,
				variableSettingData:null,
			}
		},
		created(){},
		mounted(){},
		methods:{
      initVariableSettingData(){
        let vm = this,
            url = '/point/cols'
        vm.$axios.get(url).then(response=>{
          if(response.status == 200){
            vm.variableSettingData = response.data.data
          }else{
            vm.$message.error('获取设置列表失败！')
          }
        })
      },
			/*选择*/
       handleCheckVariableAllChange(val) {
        let vm = this
        vm.checkedVariable = val ? vm.variableSettingData : [];
        vm.isIndeterminate = true;
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
        vm.status.dialogListVisible = false;
      },
      /*选中设置的列表值*/
      selectedVariableList(){
        let vm = this
        vm.$bus.$emit('checkedVariable', vm.checkedVariable)
        vm.status.dialogListVisible = false;
      },
		},
    created(){
      let vm = this
      vm.initVariableSettingData();
       vm.$bus.$on('showList', (msg) => {
         vm.status.dialogListVisible = msg
       })
    },
    mounted(){
      let vm = this
    },
	}

</script>