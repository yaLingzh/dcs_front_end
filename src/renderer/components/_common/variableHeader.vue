<template>
 <div>
   <div class="header">
        <div class="common-content">
          <div class="header-top">
            <p class="header-top-name"><em class="iconfont icon-logo"></em>DCS 变量强制</p>
            <ul class="header-nav-first">
              <li :class="{navFirstCurrent: currentNav == 'variable'}" @click="currentNav='variable'">变量组管理</li>
            </ul>
          </div>
          <!-- 变量组管理 -->
          <div class="ovh" v-if="currentNav == 'variable'">
            <dl class="header-nav-child">
              <dd class="header-nav-child-current"><el-button type="primary" @click="showList"><em class="iconfont icon-header-showlist"></em>
              <p>显示列</p></el-button></dd>
              <dd  @click="resetCurrentGroutPoint"><el-button type="primary"><em class="iconfont icon-header-cancelcurrent"></em>
              <p>取消强制</p></el-button></dd>
              <!-- <dd><el-button type="primary"><em class="iconfont icon-header-cancelall"></em>
              <p>取消所有强制</p></el-button></dd> -->
           <!--    <dd><el-button type="primary" @click="mandatory"><em class="iconfont icon-header-search"></em>
              <p>搜索</p></el-button></dd> -->
              <!-- <dd><el-button type="primary"><em class="iconfont icon-header-edit"></em>
              <p>编辑组</p></el-button></dd> -->
              <dd @click="saveNewGroutPoint"><el-button type="primary"><em class="iconfont icon-header-save"></em>
              <p>保存新组</p></el-button></dd>
              <!-- <dd><el-button type="primary" @click="mandatory"><em class="iconfont icon-header-all"></em>
              <p>所有强制列表</p></el-button></dd> -->
              <!-- <dt>变量组管理</dt> -->
            </dl>
          </div>
   
        </div>
      </div>
 </div>
</template>
<script>
  export  default{
    name:'variableHeader',
    data(){
      return {
        currentNav: 'variable',
        childNav:'',
        isNewBuildGroupPromit:false,
        resetCurrentPointPromit:false,
      }
    },
    created(){
      let vm = this
      /**
       * @Author      supper520love@126.com
       * @DateTime    2018-04-19
       * @description [新建组及取消强制时是否已经打开了强制组]
       * @return      {[booler]}                  [true/false]
       */
      vm.$bus.$on('isNewBuildGroupPromit', msg=>{
        vm.isNewBuildGroupPromit = msg
      })
      vm.$bus.$on('resetCurrentPointPromit', msg=>{
        vm.resetCurrentPointPromit = msg
      })
    },
    methods:{
      showList(){
        let vm = this
        vm.$bus.$emit('showList', true);
      },
      mandatory(){
        let vm = this
        vm.$bus.$emit('mandatory', true);
      },
      /**
       * @Author      supper520love@126.com
       * @DateTime    2018-04-19
       * @description [取消当前强制值]
       */
      resetCurrentGroutPoint(){
        let vm = this
        if(vm.resetCurrentPointPromit){
          vm.$bus.$emit('resetCurrentGroutPoint', true)
        }else{
          vm.$message.warning('请打开一个强制组')
          return
        }
      },
      /**
       * @Author      supper520love@126.com
       * @DateTime    2018-04-19
       * @description [在现在强制组基础上新建一个强制]
       * @return      {[Object]}              [新建组名，强制点]
       */
      saveNewGroutPoint(){
        let vm = this
        if(vm.isNewBuildGroupPromit){
          vm.$bus.$emit('newBuildGroutName', true)
        }else{
          vm.$message.warning('请打开一个强制组')
          return
        }
      },
    },
    
  }
</script>