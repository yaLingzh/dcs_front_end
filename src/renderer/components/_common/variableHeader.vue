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
              <dd class="header-nav-child-current"><a @click="showList"><em class="iconfont icon-header-showlist"></em>
              <p>显示列</p></a></dd>
              <dd  @click="resetCurrentGroutPoint"><a href="javascript:;"><em class="iconfont icon-header-cancelcurrent"></em>
              <p>取消当前组强制</p></a></dd>
              <dd><a href="javascript:;"><em class="iconfont icon-header-cancelall"></em>
              <p>取消所有强制</p></a></dd>
           <!--    <dd><a @click="mandatory"><em class="iconfont icon-header-search"></em>
              <p>搜索</p></a></dd> -->
              <!-- <dd><a href="javascript:;"><em class="iconfont icon-header-edit"></em>
              <p>编辑组</p></a></dd> -->
              <dd @click="saveNewGroutPoint"><a href="javascript:;"><em class="iconfont icon-header-save"></em>
              <p>保存新组</p></a></dd>
              <!-- <dd><a @click="mandatory"><em class="iconfont icon-header-all"></em>
              <p>所有强制列表</p></a></dd> -->
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
        isSavsePromit:false,
        resetCurrentPointPromit:false,
      }
    },
    created(){
      let vm = this
      vm.$bus.$on('isSavsePromit', msg=>{
        vm.isSavsePromit = msg
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

      resetCurrentGroutPoint(){
        let vm = this
        if(vm.resetCurrentPointPromit){
          vm.$bus.$emit('resetCurrentGroutPoint', true)
        }else{
          vm.$message.info('请打开一个强制组')
          return
        }
      },

      saveNewGroutPoint(){
        let vm = this
        if(vm.isSavsePromit){
          vm.$bus.$emit('saveNewGroutPoint', true)
        }else{
          vm.$message.info('请打开一个强制组')
          return
        }
      },
    }
  }
</script>