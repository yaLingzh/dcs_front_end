<template>
 <div>
 	<el-dialog title="变量搜索" width="57%" :visible.sync="status.dialogTrendGroupVisible">
    <el-tabs type="border-card">
      <el-tab-pane label="添加组">
        <template>
          1
        </template>
      </el-tab-pane>
      <el-tab-pane label="保存新组">
        <template>
          2
        </template>
      </el-tab-pane>
      <el-tab-pane label="加入组">
        <template>
          3
        </template>
      </el-tab-pane>
      <el-tab-pane label="所有强制点">
        <template>
          4
        </template>
      </el-tab-pane>
    </el-tabs>

	</el-dialog>
 </div>
</template>
<script>
    export default {
    	name:'trendGroupManagement',
      data() {
      return {
      	status:{
          dialogTrendGroupVisible: false,
      	},
      }
    },
    methods:{
    },
    mounted(){
      let vm = this
       vm.$bus.$on('mandatory', (msg) => {
         vm.status.dialogTrendGroupVisible = msg
       })
    },
    components:{
      // trendGroup: resolve => require(['./trendGroupManagement.vue'], resolve),
      // trendPoint: resolve => require(['./trendPointManagement.vue'], resolve),
      // groupPoint: resolve => require(['./groupPointManagement.vue'], resolve),
    }

  };
</script>