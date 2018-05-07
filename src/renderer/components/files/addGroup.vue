<template>
 <div>
 	<el-dialog title="新建用例组" width="57%" :visible.sync="dialogGroupVisible">
 		<div class="grid-middle-content test-record-content">
       <el-form ref="addGroupForm" :inline="true" :rules="addGroupRules" :model="dataFrom" class="demo-form-inline">
        <el-form-item label="用例组名称">
          <el-input v-model="dataFrom.groupName" size="50"></el-input>
        </el-form-item>
        <el-form-item>
          【提示：用例组可上下拖拽调整顺序！】
        </el-form-item>
        
        <template>
          <table class="dcs-common-table dcs-common-table--text" width="100%">
            <thead>
              <tr>
                <th>编号</th>
                <th>名称</th>
              </tr>
            </thead>
            <draggable element="tbody" v-model="groupDatas" :options="{dragClass: 'sd_drag', animation:300}">
              <tr v-for="group in groupDatas">
                <td>{{group.number}}</td>
                <td>{{group.name}}</td>
              </tr>
            </draggable>
          </table>
          </template>
          <div class="tool-button-content"><el-button size="mini" @click="submitForm(addGroupForm)" type="primary">创建用例组</el-button></div>
          </el-form>
     </div>
	</el-dialog>
 </div>
</template>
<script>
  import types from '../../store/project/types'
  import {mapGetters } from 'vuex';
  import draggable from 'vuedraggable'
  export default {
    	name:'testRecord',
      data() {
      return {
        multipleSelection:[],
      	dataFrom:{
          groupName:null,
        },
         isIndeterminate: true,
        groupDatas: null,
        dialogGroupVisible: false,
        addGroupRules:{
          groupName:[
           { required: true, message: '请输入用例组名称', trigger: 'blur' }
          ],
        },
      }
    },
    computed:{
      ...mapGetters({
          vxGlobal_curProjectDcs: types.GETTERS.curProjectDcs,
      }),
    },
    methods:{
    	 // toggleSelection(rows) {
      //   if (rows) {
      //     rows.forEach(row => {
      //       this.$refs.multipleTable.toggleRowSelection(row);
      //     });
      //   } else {
      //     this.$refs.multipleTable.clearSelection();
      //   }
      // },

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      submitForm(formName) {
        let vm = this
        vm.$refs[formName].validate((valid) => {
          if (valid) {
            vm.buildGroupsData()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      buildGroupsData(){
        let vm = this
        let url = 'case_group'
        vm.$axios.post(url).then(response=>{

        })
      },

    },
    mounted(){
      let vm = this
      // console.log(vm.vxGlobal_curProjectDcs, 'vxGlobal_curProjectDcs');
      vm.groupDatas = vm.vxGlobal_curProjectDcs.case_groups
      console.log(vm.groupDatas, 'groupDatas');
      vm.$bus.$on('addGroup', (msg) => {
         vm.dialogGroupVisible = msg
       })
    },
    components: {
      draggable,
    },
    beforeDestory(){
      let vm = this
      vm.$bus.$off('addGroup', true);
    }

  };
</script>