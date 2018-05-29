<template>
<div>
  <top-header v-if="status.isShowTemplate"></top-header>
  <div class="body-content" v-if="status.isShowTemplate">
    <el-row :gutter="0" >
      <el-col :span="4" class="side-left">
        <left-menu ></left-menu>
      </el-col>
      <el-col :span="20" class="side-right">
        <div class="grid-content grid-bg-purple" >
          <p class="grid-middle-title"><!-- <em class="el-icon-minus"></em> --></p>
          <div class="grid-middle-content">
            <current-pro-data-mess></current-pro-data-mess>
          </div>
       </div>
    </el-col>
    </el-row>
  </div>
  <login></login>
  <newProject :historyProjectData="historyProjectData"></newProject>
  <add-group></add-group>
  <netWorkSet></netWorkSet>
  <environment-test></environment-test>
  <ls-checking></ls-checking>
  <parameterSetting></parameterSetting>
  <language></language>
  <popTestTable></popTestTable>
  <trendManage></trendManage>
  <responseTime></responseTime>
  <signalsimulation></signalsimulation>
  <popTestRecord></popTestRecord>
  <statisticalReport></statisticalReport>
  <logList></logList>
  <userManage></userManage>
  <userGroupManage></userGroupManage>
  <authorized></authorized>
  <!-- <trendFullScreen></trendFullScreen> -->
</div>
</template>

<script>
import types from "../store/project/types";
import {mapGetters } from "vuex";
import {getStorageDataAndDecode} from "../util/common";
export default {
  name: 'dcs_index',
  data () {
    return {
     searchText:null,
     historyProjectData:null,
     status:{
      isShowTemplate:false
     },
     // curProject:null,
    }
  },
  computed:{
    ...mapGetters({
        vxGlobal_curProject: types.GETTERS.curProject,
        vxGlobal_isLogged: types.GETTERS.isLogged,
      }),
   
  },
  methods: {
    getStorageDataAndDecode,
  },
  mounted(){
    let vm = this
    if(vm.$_.isEmpty(vm.vxGlobal_curProject)&&vm.vxGlobal_isLogged){
      vm.status.isShowTemplate = true
    }
    vm.$bus.$on('mainpageshowbox', msg=>{
      vm.status.isShowTemplate = msg
    })
  },
  created(){
    let vm = this
    
  },
  components:{
    login: resolve => require(['./login/login.vue'], resolve),
    trend: resolve => require(['./trend/trend.vue'], resolve),
    topHeader: resolve => require(['./_common/header.vue'], resolve),
    record: resolve => require(['./record/record.vue'], resolve),
    testRecord: resolve => require(['./record/testRecord.vue'], resolve),
    leftMenu: resolve => require(['./_common/leftMenuMain.vue'], resolve),
    newProject: resolve => require(['./files/newProject.vue'], resolve),
    addGroup: resolve => require(['./files/addGroup.vue'], resolve), // 新建用例组
    netWorkSet: resolve => require(['./configure/netWorkSet.vue'], resolve), // 网络环境配置
    environmentTest: resolve => require(['./configure/environmentTest.vue'], resolve), //测试环境配置
    lsChecking: resolve => require(['./configure/lsChecking.vue'], resolve), //环境自检
    parameterSetting: resolve => require(['./configure/parameterSetting.vue'], resolve), //执行参数
    language: resolve => require(['./configure/language.vue'], resolve), //语言切换
    popTestTable: resolve => require(['./workTest/popTestTable.vue'], resolve), //中止规程列表

    trendManage: resolve => require(['./trend/trendManagement.vue'], resolve), //趋组管理
    responseTime: resolve => require(['./trend/responseTime.vue'], resolve), //闭环响应时间
    signalsimulation: resolve => require(['./trend/signalsimulation.vue'], resolve), //闭环响应时间
    trendFullScreen: resolve => require(['./trend/trendFullScreen.vue'], resolve), //全屏

    popTestRecord: resolve => require(['./record/popTestRecord.vue'], resolve), //测试记录
    statisticalReport: resolve => require(['./record/statisticalReport.vue'], resolve), //统计报表
    logList: resolve => require(['./record/logList.vue'], resolve), //日志

    userManage: resolve => require(['./account/userManage.vue'], resolve), //用户管理
    userGroupManage: resolve => require(['./account/userGroupManage.vue'], resolve), //用户组管理
    authorized: resolve => require(['./account/authorized.vue'], resolve), //日志
    currentProDataMess: resolve => require(['./files/currentProDataInfo.vue'], resolve), //日志

  },
}
</script>


