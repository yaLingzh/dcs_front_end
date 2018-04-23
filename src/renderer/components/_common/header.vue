<template>
  <div>
  	<div class="header">
		    <div class="common-content">
		      <div class="header-top">
		        <p class="header-top-name"><em class="iconfont icon-logo"></em>project name - DCS测试管理软件</p>
		        <ul class="header-nav-first">
		          <li :class="{navFirstCurrent: currentNav == 'files'}"  @click="currentNav = 'files'">文件</li>
		          <li :class="{navFirstCurrent: currentNav == 'workTest'}" @click="currentNav='workTest'">规程测试</li>
		          <li :class="{navFirstCurrent: currentNav == 'trend'}" @click="currentNav='trend'">趋势</li>
		          <li :class="{navFirstCurrent: currentNav == 'record'}" @click="currentNav='record'">记录</li>
		          <li :class="{navFirstCurrent: currentNav == 'variable'}"><a @click="openVariable">变量组管理</a></li>
		          <li :class="{navFirstCurrent: currentNav == 'account'}" @click="currentNav='account'">账户管理</li>
		        </ul>
		        <span class="header-top-rightBtn" @click="status.languageEn = !status.languageEn">
		        	<span v-show="!status.languageEn"><i class="iconfont icon-header-language"></i>中文版</span>
		        	<span v-show="status.languageEn"><i class="iconfont icon-header-language-en"></i>英文版</span>
		        </span>
		      </div>
		      <div class="ovh" v-if="currentNav == 'files'">
		        <dl class="header-nav-child">
		          <dd v-if="$_.isEmpty(vxGlobal_curProject)&&vxGlobal_isLogged" class="header-nav-child-current"><a @click="newProject"><em class="iconfont icon-header-build"></em>
		          <p>新建</p></a></dd>
		          <dd v-if="$_.isEmpty(vxGlobal_curProject)&&vxGlobal_isLogged"><a href="javascript:;">
		          	<el-upload
		          	  action=""
								  class="upload-demo"
								  :show-file-list="false"
								  >
		          	<em class="iconfont icon-header-open"></em>
		          <p>打开</p>
		          </el-upload>
		        </a></dd>
		          <dd><a href="javascript:;"><em class="iconfont icon-header-save"></em>
		          <p>保存</p></a></dd>
		          <dd><a href="javascript:;"><em class="iconfont icon-header-addFirst"></em>
		          <p>初始化导入</p></a></dd>
		          <dd><a href="javascript:;">
		          	<el-upload
		          	  action="http://10.144.238.103:8080/api/v1/procedure/upload"
								  class="upload-demo"
								  :limit="1"
								  :show-file-list="false"
								  :on-success="uploadSuccess"
								  >
								  <em class="iconfont icon-header-add"></em>
		          <p>导入</p>
		          </el-upload>
		        </a></dd>
		          <dd><a @click="dialogAddGroup"><em class="iconfont icon-header-zu"></em>
		          <p>新建用例组</p></a></dd>
		          <!-- <dt>基础操作</dt> -->
		        </dl>
		        <em class="header-nav-line"></em>
		        <dl class="header-nav-child">
		          <dd class="" ><a @click="testEnv"><em class="iconfont icon-header-test"></em>
		          <p>测试环境</p></a></dd>
		          <dd><a @click="netWorkSet"><em class="iconfont icon-header-config"></em>
		          <p>网络配置</p></a></dd>
		          <dd><a @click="lsChecking"><em class="iconfont icon-header-see"></em>
		          <p>环境自检</p></a></dd>
		          <dd><a @click="parameterSetting"><em class="iconfont icon-header-goon"></em>
		          <p>执行参数</p></a></dd>
		          <!-- <dd><a @click="language"><em class="iconfont icon-header-language"></em>
		          <p>语言切换</p></a></dd> -->
		          <!-- <dt>配置</dt> -->
		        </dl>
		      </div>
		      <!-- 规程测试 -->
		      <div class="ovh" v-if="currentNav == 'workTest'">
		        <dl class="header-nav-child">
		          <dd><a href="javascript:;"><em class="iconfont icon-header-goon"></em>
		          <p>自动执行</p></a></dd>
		          <dd><a href="javascript:;"><em class="iconfont icon-header-singleplay"></em>
		          <p>单步执行</p></a></dd>
		          <dd><a href="javascript:;"><em class="iconfont icon-header-play"></em>
		          <p>继续</p></a></dd>
		          <dd><a href="javascript:;"><em class="iconfont icon-header-pause"></em>
		          <p>暂停</p></a></dd>
		          <dd><a href="javascript:;"><em class="iconfont icon-header-out"></em>
		          <p>退出</p></a></dd>
		          <dd><a href="javascript:;"><em class="iconfont icon-header-repeat"></em>
		          <p>循环运行</p></a></dd>
		          <dd><a @click="popTestTable"><em class="iconfont icon-header-stop"></em>
		          <p>中止规程列表</p></a></dd>
		          <!-- <dt>规程测试</dt> -->
		        </dl>
		      </div>
		      <!-- 趋势 -->
		      <div class="ovh" v-if="currentNav == 'trend'">
		        <dl class="header-nav-child">
		          <dd class="header-nav-child-current"><a @click="trendManage"><em class="iconfont icon-header-trendAll"></em>
		          <p>趋势组管理</p></a></dd>
		          <dd><a href="javascript:;"><em class="iconfont icon-header-fullscreen"></em>
		          <p>趋势组全屏</p></a></dd>
		          <dd><a @click="responseTime"><em class="iconfont icon-header-trendtime"></em>
		          <p>闭环响应时间</p></a></dd>
		          <dd><a @click="signalsimulation"><em class="iconfont icon-header-signal"></em>
		          <p>信号仿真</p></a></dd>
		          <!-- <dt>趋势</dt> -->
		        </dl>
		      </div>
		      <!-- 记录 -->
		      <div class="ovh" v-if="currentNav == 'record'">
		       <dl class="header-nav-child">
		          <dd><a @click="popTestRecord"><em class="iconfont icon-header-record"></em>
		          <p>测试记录</p></a></dd>
		          <dd><a @click="statisticalReport"><em class="iconfont icon-header-report"></em>
		          <p>统计报表</p></a></dd>
		          <dd><a @click="logList"><em class="iconfont icon-header-log"></em>
		          <p>日志</p></a></dd>
		          <!-- <dt>记录</dt> -->
		        </dl>
		      </div>
		      <!-- 账户管理 -->
		      <div class="ovh" v-if="currentNav == 'account'">
		        <dl class="header-nav-child">
		          <dd class="header-nav-child-current"><a @click="userManage"><em class="iconfont icon-header-usergroup"></em>
		          <p>用户管理</p></a></dd>
		          <dd><a @click="userGroupManage"><em class="iconfont icon-header-user"></em>
		          <p>用户组管理</p></a></dd>
		          <dd><a @click="authorized"><em class="iconfont icon-header-warrant"></em>
		          <p>授权管理</p></a></dd>
		          <dd><a href="javascript:;"><em class="iconfont icon-header-loginout"></em>
		          <p>用户登出</p></a></dd>
		          <!-- <dt>账户管理</dt> -->
		        </dl>
		        </dl>
		      </div>
		    </div>
		  </div>
  </div>
</template>
<script>
 import types from "../../store/project/types";
 import {mapGetters } from "vuex";
 export default{
 	name:'headerNav',
 	data(){
 		return {
 			currentNav: 'files',
 			childNav:'',
 			status:{
 				languageEn:false
 			}
 		}
 	},
 	computed:{
    ...mapGetters({
        vxGlobal_curProject: types.GETTERS.curProject,
        vxGlobal_isLogged: types.GETTERS.isLogged,
        vxGlobal_token: types.GETTERS.token,
      }),
  },
 	methods:{
 		uploadSuccess(response, file, fileList){
 			let vm = this
 			console.log(response, 'response');
 			vm.$message.success('导入成功')
 		},
 		newProject(){
 			let vm = this
 			vm.$bus.$emit('newProject',true);
 		},
 		dialogAddGroup(){
 			let vm = this
 			vm.$bus.$emit('addGroup',true);
 		},
 		testEnv(){
 			let vm = this
 			vm.$bus.$emit('testEnv', true);
 		},
    netWorkSet(){
    	let vm = this
 			vm.$bus.$emit('networkSet', true);
    },
    lsChecking(){
    	let vm = this
 			vm.$bus.$emit('lsChecking', true);
    },
    parameterSetting(){
    	let vm = this
 			vm.$bus.$emit('parameterSetting', true);
    },
    language(){
    	let vm = this
 			vm.$bus.$emit('language', true);
    },
    popTestTable(){
    	let vm = this
 			vm.$bus.$emit('stopTestList', true);
    },
    trendManage(){
    	let vm = this
 			vm.$bus.$emit('trendManage', true);
    },

     responseTime(){
    	let vm = this
 			vm.$bus.$emit('time', true);
    },
    signalsimulation(){
    	let vm = this
 			vm.$bus.$emit('signalsimulation', true);
    },
    popTestRecord(){
    	let vm = this
 			vm.$bus.$emit('popTestRecord', true);
    },
    statisticalReport(){
    	let vm = this
 			vm.$bus.$emit('report', true);
    },
    logList(){
    	let vm = this
 			vm.$bus.$emit('log', true);
    },
    userManage(){
    	let vm = this
 			vm.$bus.$emit('userManage', true);
    },
     userGroupManage(){
    	let vm = this
 			vm.$bus.$emit('userGroupManage', true);
    },
    authorized(){
    	let vm = this
 			vm.$bus.$emit('authorized', true);
    },
    openVariable(){
    	let vm = this
    	let routerLink = vm.$router.resolve({name: 'variable', path: '/variable'})
    	window.open(routerLink.href, '_blank')
    },
 	},

 }
</script>