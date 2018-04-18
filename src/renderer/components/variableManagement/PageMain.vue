<template>
<div>
   <headerNav></headerNav>
  <div class="body-content">
    <el-row :gutter="0">
      <el-col :span="4">
        <left-menu :variablePointsGroup="variablePointsGroupData" :activeName='liActiveName'></left-menu>
      </el-col>
      <el-col :span="20">
        <div class="grid-content grid-bg-purple">
          <!-- <p class="grid-middle-title"><em class="el-icon-minus"></em></p> -->
          <el-tabs v-model="editVeriableTabsValue" type="card" closable @tab-remove="removeVaribleTab">
            <el-tab-pane
              v-for="(item, index) in veraibleTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            >
              <div class="grid-middle-content">
                 <variableTable :variablePointData="item.content"></variableTable>
              </div>
            </el-tab-pane>
          </el-tabs>
       </div>
    </el-col>
    </el-row>
  </div>
  <showList></showList>
  <mandatory></mandatory>
</div>
</template>

<script>
  import {setStorageDataAndEncode} from "../../util/common";
export default {
  name: 'variableManagement',
  data () {
    return {
     searchText:null,
     variableMenuData:null, //设置的变量值
     variablePointsGroupData:null, //变量组列表值
     variableListData:null, //变量列表
      editVeriableTabsValue: '1',
      veraibleTabs: [],
    liActiveName:null,
    }
  },
  created(){
    let vm = this;
    /**
     * @Author      supper520love@126.com
     * @DateTime    2018-04-18
     * @description [tab页签数据及相关操作]
     */
    vm.$bus.$on('veraibleTabs', msg=>{
       if(!vm.$_.isEmpty(vm.veraibleTabs)){
          let hasVer = vm.$_.find(vm.veraibleTabs, item=>{ return item.sorts == msg.sorts})
          if(vm.$_.isEmpty(hasVer)){
            vm.liActiveName = msg.sorts
            vm.editVeriableTabsValue = msg.newTabName;
            vm.veraibleTabs.push(msg);
          }else{
            vm.editVeriableTabsValue = hasVer.newTabName
            vm.liActiveName = hasVer.sorts
          }
       }else{
        vm.liActiveName = msg.sorts
        vm.editVeriableTabsValue = msg.newTabName;
        vm.veraibleTabs.push(msg);
       }
    })
   vm.initPointsGroup()
   vm.initPointList()
  },

  methods: {
    setStorageDataAndEncode,
    /*获取变量组列表*/
    initPointsGroup(){
      let vm = this
      let url = '/point/groups'
      vm.$axios.get(url).then(response=>{
        if(response.status == 200){
          vm.variablePointsGroupData = response.data.data
          // vm.variablePointsGroupData = resultData.map(item =>{return item.group_name})
        }else{
          vm.$message.error('获取变量组列表失败！')
        }
      }).catch(response=>{
        vm.$message.error('获取变量组列表请求失败')
      })
    },
    /**
     * @Author      supper520love@126.com
     * @DateTime    2018-04-18
     * @description [获取变量列表]
     * @return      {[Object]}              [获取变量列表数据]
     */
    initPointList(){
      let vm = this
      let url = '/point'
      vm.$axios.get(url).then(response=>{
        if(response.status == 200){
          vm.variableListData = response.data.data
          vm.setStorageDataAndEncode('variableListData', vm.variableListData)
        }else {
          vm.$message.error('获取变量列表失败！')
        }
      }).catch(response=>{
        vm.$message.error('获取变量列表请求失败')
      })
    },
    /**
     * @Author      supper520love@126.com
     * @DateTime    2018-04-18
     * @description [删除当前组页面签]
     * @param       {[String]}              targetName [当前组名]
     * @return      {[Array]}                         [最新veraibleTabs]
     */
      removeVaribleTab(targetName) {
        let vm = this
        let tabs = vm.veraibleTabs;
        let activeName = vm.editVeriableTabsValue;
        let currentLi = null
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
                currentLi = nextTab.sorts;
              }
            }
          });
          
        }else{
          activeName = vm.editVeriableTabsValue;
          currentLi = vm.liActiveName;
        }

        vm.liActiveName = currentLi
        vm.editVeriableTabsValue = activeName;
        vm.veraibleTabs = tabs.filter(tab => tab.name !== targetName);
        if(vm.$_.isEmpty(vm.veraibleTabs)){
          vm.$bus.$emit('resetCurrentPointPromit', false)
          vm.$bus.$emit('isSavsePromit', false)
        }
      }
  },

  components:{
    headerNav: resolve => require(['../_common/variableHeader.vue'], resolve),
    trend: resolve => require(['../trend/trend.vue'], resolve),
    record: resolve => require(['../record/record.vue'], resolve),
    testRecord: resolve => require(['../record/testRecord.vue'], resolve),
    leftMenu: resolve => require(['../_common/leftMenu.vue'], resolve),
    showList: resolve => require(['./showList.vue'], resolve),
    mandatory: resolve => require(['./mandatoryList.vue'], resolve),
    variableTable: resolve => require(['./variableTable.vue'], resolve),
  },
}
</script>


