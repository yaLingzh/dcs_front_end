<template>
<div>
  <top-header></top-header>
  <div class="body-content">
    <el-row :gutter="0">
      <el-col :span="4">
        <left-tree></left-tree>
      </el-col>
      <el-col :span="15">
        <div class="grid-content grid-bg-purple">
          <p class="grid-middle-title"><em class="el-icon-minus"></em></p>
          <div class="grid-middle-content">内容</div>
       </div>
       <test-record></test-record>
       <div class="grid-content grid-bg-purple">
         <record></record>
       </div>
    </el-col>
      <el-col :span="5"><div class="grid-content grid-bg-purple-light">
        <p class="grid-middle-title">趋势<em class="el-icon-minus"></em></p>
        <div class="grid-side-content">
          <trend></trend>
        </div>
      </div></el-col>
    </el-row>
  </div>
  <newProject></newProject>
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
export default {
  name: 'dcs_index',
  data () {
    return {
     searchText:null,
    }
  },
  methods: {
  },
  components:{
    trend: resolve => require(['./trend/trend.vue'], resolve),
    topHeader: resolve => require(['./_common/header.vue'], resolve),
    record: resolve => require(['./record/record.vue'], resolve),
    testRecord: resolve => require(['./record/testRecord.vue'], resolve),
    leftTree: resolve => require(['./_common/treeOne.vue'], resolve),
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



  },
}
</script>


