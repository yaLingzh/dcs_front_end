<template>
 <div>
 	<el-dialog title="趋势组管理" width="57%" :visible.sync="status.dialogTrendGroupVisible">
    <el-tabs type="border-card">
      <el-tab-pane label="趋势组管理">
        <template>
         <trend-group></trend-group>
        </template>
      </el-tab-pane>
      <el-tab-pane label="趋势点管理">
        <template>
         <trend-point></trend-point>
        </template>
      </el-tab-pane>
      <el-tab-pane label="组点管理">
        <template>
         <group-point></group-point>
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
       vm.$bus.$on('trendManage', (msg) => {
         vm.status.dialogTrendGroupVisible = msg
       })
    },
    components:{
      trendGroup: resolve => require(['./trendGroupManagement.vue'], resolve),
      trendPoint: resolve => require(['./trendPointManagement.vue'], resolve),
      groupPoint: resolve => require(['./groupPointManagement.vue'], resolve),
    }

  };
</script>