<template>
 <div>
 	  <el-dialog
      title="变量列设置"
      :visible.sync="status.dialogListVisible"
      append-to-body>
      <template>
        <p><em style="padding-right:15px;">一级菜单</em><el-checkbox :indeterminate="status.levelMenuIs" v-model="status.levelMenuCheckAll" @change="levelMenuAllChange">全选</el-checkbox></p>
        <!-- <div></div> -->
        <div style="margin: 15px 0;">
          <el-checkbox-group v-model="checkedVariable" @change="CheckedLevelVariableChange">
            <el-checkbox v-for="(variable,index) in variableSettingData" :label="variable" :key="'variable_'+index">{{variable}}</el-checkbox>
          </el-checkbox-group>
        </div>
       </template>
       <div slot="footer" class="dialog-footer">
			    <el-button @click="status.dialogListVisible = false">取 消</el-button>
			    <el-button type="primary" @click="status.dialogListVisible = false">设置</el-button>
			  </div>
    </el-dialog>
 </div>
</template>
<script>
	
	export default{
		name:'showList',
		data(){
			return {
				status:{
					dialogListVisible:false,
  				levelMenuIs:false,
          levelMenuCheckAll: false,
				},
				checkedVariable:null,
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
            console.log(vm.variableSettingData);
          }else{
            vm.$message.error('获取设置列表失败！')
          }
        })
      },
			/*选择*/
      levelMenuAllChange(val) {
        this.checkedMenu = val ? levelMenu1 : [];
        this.levelMenuIs = true;
      },
      CheckedLevelVariableChange(value) {
        let checkedCount = value.length;
        this.levelMenuCheckAll = checkedCount === vm.variableSettingData.length;
        this.levelMenuIs = checkedCount > 0 && checkedCount < vm.variableSettingData.length;
      },
		},
    mounted(){
      let vm = this

       vm.$bus.$on('showList', (msg) => {
         vm.status.dialogListVisible = msg
       })

       vm.initVariableSettingData();
    },
	}

</script>