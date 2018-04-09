<template>
 <div>
 	<el-dialog title="新建用例组" width="57%" :visible.sync="dialogGroupVisible">
 		<div class="grid-middle-content test-record-content">
       <el-form ref="form" :inline="true" :model="dataFrom" class="demo-form-inline">
        <el-form-item label="用例组名称">
          <el-input v-model="dataFrom.groupName" size="50"></el-input>
        </el-form-item>
        <el-form-item>
          【提示：用例组可上下拖拽调整顺序！】
        </el-form-item>
        </el-form>
        <template>
            <el-table
              :data="groupDatas"
              height="350"
              ref="multipleTable"
              border
              @selection-change="handleSelectionChange"
              style="width: 100%">
               <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="num"
                label="编号">
              </el-table-column>
              <el-table-column
                prop="group_name"
                label="名称">
              </el-table-column>
            </el-table>
          </template>
          <div class="tool-button-content"><!-- <el-button type="primary" @selection-change="handleSelectionChange" size="mini">全选</el-button> --><el-button type="primary" @click="toggleSelection()" size="mini">全不选</el-button><el-button size="mini" type="primary">创建用例组</el-button></div>
     </div>
	</el-dialog>
 </div>
</template>
<script>
    export default {
    	name:'testRecord',
      data() {
      return {
        multipleSelection:[],
      	dataFrom:{
          groupName:null,
        },
         isIndeterminate: true,
        groupDatas: [{
          num:'1',
          group_name:'234231'
        }, {
          num:'2',
          group_name:'234231'
        }, {
          num:'350',
          group_name:'234231'
        }, {
          num:'4',
          group_name:'234231'
        }, {
          num:'5',
          group_name:'234231'
        }, {
          num:'6',
          group_name:'234231'
        }, {
          num:'7',
          group_name:'234231'
        }],
        dialogGroupVisible: false,
      }
    },
    methods:{
    	 toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
      }

    },
    mounted(){
      let vm = this
      vm.$bus.$on('addGroup', (msg) => {
         vm.dialogGroupVisible = msg
       })
    },
    beforeDestory(){
      let vm = this
      vm.$bus.$off('addGroup', true);
    }

  };
</script>