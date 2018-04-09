<template>
 <div>
 	<el-dialog title="用户管理" :visible.sync="status.dialogTableVisible">
	  <el-table :data="authorizeationGroupData">
	    <el-table-column property="num" label="序号" width="150"></el-table-column>
	    <el-table-column property="groupName" label="组名称"></el-table-column>
	    <el-table-column property="operation" label="拥有权限"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="50">
        <template slot-scope="scope">
          <el-button @click="status.dialogUserVisible = true" type="text" size="small">设置</el-button>
        </template>
      </el-table-column>
	  </el-table>
    
	  <el-dialog
      width="50%"
      title="用户权限设置"
      :visible.sync="status.dialogUserVisible"
      append-to-body>
      <template>
        <p>一级菜单</p>
        <div><el-checkbox :indeterminate="status.levelMenuIs" v-model="status.levelMenuCheckAll" @change="levelMenuAllChange">全选</el-checkbox></div>
        <div style="margin: 15px 0;">
          <el-checkbox-group v-model="checkedMenu" @change="CheckedLevelMenuChange">
            <el-checkbox v-for="menu in levelMenu" :label="menu" :key="menu">{{menu}}</el-checkbox>
          </el-checkbox-group>
        </div>
       </template>

       <template>
        <p>二级菜单</p>
         <div><el-checkbox :indeterminate="status.levelMenuTwoIs" v-model="status.levelMenuTwoCheckAll" @change="levelMenuAllTwoChange">全选</el-checkbox></div>
        <div style="margin: 15px 0;">
          <el-checkbox-group v-model="checkedMenuTwo" @change="CheckedLevelMenuTwoChange">
            <el-checkbox v-for="menu in levelMenuTwo" :label="menu" :key="menu">{{menu}}</el-checkbox>
          </el-checkbox-group>
        </div>
       </template>
    </el-dialog>
	</el-dialog>
 </div>
</template>
<script>
   const levelMenu1 = ['View','Project','Test','Performance Test','Variable Forcing', 'Trends', 'TrendFullScreen', 'Close','SignalSimu','Report','Record','Help','Account','Log Out']
   const levelMenu2 = ['Reset Default', 'New Project', 'Open', 'Save P', 'Import IC', 'Procedure']
    export default {
    data() {
      return {
      	status:{
          dialogTableVisible: false,
      		dialogUserVisible:false,
          levelMenuIs:false,
          levelMenuTwoIs:false,
          levelMenuCheckAll: false,
          levelMenuTwoCheckAll: false
      	},
        checkedMenu:null,
        checkedMenuTwo:null,
        levelMenu:levelMenu1,
        levelMenuTwo:levelMenu2,
        authorizeationGroupData: [{
          num: '202',
          groupName: '王小虎',
          operation: 'guest'
        }, {
          num: '201',
          groupName: '王小虎',
          operation: 'administrator'
        }, {
          num: '201',
          groupName: '王小虎',
          operation: 'administrator'
        }, {
          num: '201',
          groupName: '王小虎',
          operation: 'administrator'
        }],
      }
    },
    methods:{
      /*选择*/
      levelMenuAllChange(val) {
        this.checkedMenu = val ? levelMenu1 : [];
        this.levelMenuIs = true;
      },
      CheckedLevelMenuChange(value) {
        let checkedCount = value.length;
        this.levelMenuCheckAll = checkedCount === this.levelMenu.length;
        this.levelMenuIs = checkedCount > 0 && checkedCount < this.levelMenu.length;
      },

      /*选择*/
      levelMenuAllTwoChange(val) {
        this.checkedMenuTwo = val ? levelMenu2 : [];
        this.levelMenuTwoIs = true;
      },
      CheckedLevelMenuTwoChange(value) {
        let checkedCount = value.length;
        this.levelMenuTwoCheckAll = checkedCount === this.levelMenuTwo.length;
        this.levelMenuTwoIs = checkedCount > 0 && checkedCount < this.levelMenuTwo.length;
      },


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
       vm.$bus.$on('authorized', (msg) => {
         vm.status.dialogTableVisible = msg
       })
    },

  };
</script>