<template>
 <div>
   <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
    <el-tab-pane
      :key="item.name"
      v-for="(item, index) in editableTabs"
      :label="item.title"
      :name="item.name"
    >
      <div class="grid-middle-content">{{item.content}}</div>
    </el-tab-pane>
  </el-tabs>
 </div>
</template>
<script>

 export default{
 	name:'record',
 	data(){
 		return {
 		  editableTabsValue: '2',
	      editableTabs: [{
	        title: '工具',
	        name: '1',
	        content: '工具 content'
	      }, {
	        title: '记录',
	        name: '2',
	        content: '记录 content'
	      }],
	      tabIndex: 2
 		}
 	},
 	methods:{
 		handleTabsEdit(targetName, action) {
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      }
 	},
 	created(){

 	}
 }
</script>