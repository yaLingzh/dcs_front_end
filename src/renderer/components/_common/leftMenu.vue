<template>
 <div class="grid-content grid-bg-purple-dark">
 	<p class="left-menu-tree-title">变量列表 <!-- <em class class="el-icon-refresh"></em> --></p>
   <ul class="let-var-menus">
 	<li v-for="(varMenu, index) in variablePointsGroup" v-model="groupName" :class="{active: index == activeName}" @click="getCurrentMenu(varMenu , index)"><span>{{varMenu.group_name}}</span> <i class="el-icon-menus el-icon-arrow-right"></i></li>
   </ul>
 </div>
</template>
<script>
	import {getStorageDataAndDecode} from "../../util/common";
  export default {
  	data(){
  		return {
  			veraibleTabs: [],
  			tabIndex: 0,
  			groupName:null,
  			activeLi:null,
  			veraiblePointerDatas:null,
  		}
  	},
  	props:['variablePointsGroup','activeName'],
  	created(){
  		let vm = this
  		vm.veraiblePointerDatas = vm.getStorageDataAndDecode('variableListData')
  	},
    methods: {
    	getStorageDataAndDecode,
      getCurrentMenu(val, index) {
      	let vm = this
        let newTabName = ++ vm.tabIndex + '';
        let pointerObj = []
        vm.$_.forEach(val.points, item=>{
        	pointerObj.push(vm.veraiblePointerDatas.filter(items=>{ return items.point_name == item}))
        })
        vm.activeLi = index
       	vm.veraibleTabs={
	        title: val.group_name,
	        name: newTabName,
	        content: vm.$_.flatten(pointerObj),
	        newTabName: newTabName,
	        sorts: index
	      	}
       	vm.$bus.$emit('veraibleTabs', vm.veraibleTabs)
      },
     
    }
  }
</script>