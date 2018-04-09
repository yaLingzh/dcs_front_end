<template>
 <div>
 	  <el-dialog
      title="用户权限设置"
      :visible.sync="status.dialogListVisible"
      append-to-body>
      <template>
        <p><em style="padding-right:15px;">一级菜单</em><el-checkbox :indeterminate="status.levelMenuIs" v-model="status.levelMenuCheckAll" @change="levelMenuAllChange">全选</el-checkbox></p>
        <!-- <div></div> -->
        <div style="margin: 15px 0;">
          <el-checkbox-group v-model="checkedMenu" @change="CheckedLevelMenuChange">
            <el-checkbox v-for="menu in levelMenu" :label="menu" :key="menu">{{menu}}</el-checkbox>
          </el-checkbox-group>
        </div>
       </template>
       <div slot="footer" class="dialog-footer">
			    <el-button @click="status.dialogListVisible = false">取 消</el-button>
			    <el-button type="primary" @click="status.dialogListVisible = false">设置</el-button>
			  </div>
    </el-dialog>
 </div>
</template>
<script>
	const levelMenu1 = ['View','Project','Test','Performance Test','Variable Forcing', 'Trends', 'TrendFullScreen', 'Close','SignalSimu','Report','Record','Help','Account','Log Out']
	export default{
		name:'showList',
		data(){
			return {
				status:{
					dialogListVisible:false,
  				levelMenuIs:false,
          levelMenuCheckAll: false,
				},
				checkedMenu:null,
				levelMenu:levelMenu1,
			}
		},
		created(){},
		mounted(){},
		methods:{
			/*选择*/
      levelMenuAllChange(val) {
        this.checkedMenu = val ? levelMenu1 : [];
        this.levelMenuIs = true;
      },
      CheckedLevelMenuChange(value) {
        let checkedCount = value.length;
        this.levelMenuCheckAll = checkedCount === this.levelMenu.length;
        this.levelMenuIs = checkedCount > 0 && checkedCount < this.levelMenu.length;
      },
		},
    mounted(){
      let vm = this
       vm.$bus.$on('showList', (msg) => {
         vm.status.dialogListVisible = msg
       })
    },
	}

</script>