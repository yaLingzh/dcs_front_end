<template>
  <div>
  	<div class="grid-content grid-bg-purple-dark">
      <p class="left-menu-tree-title">项目资源 <!-- <em class class="el-icon-minus"></em> --></p>
      <p class="left-menu-tree-tool">
        <!-- <em class="iconfont icon-menu-see"></em><em class="iconfont icon-menu-break"></em> -->
         <el-input placeholder="请输入内容" auto-complete="on" v-model="filterText" size="mini" class="input-with-select">
          <el-button slot="append" size="mini" icon="el-icon-search"></el-button>
        </el-input>
      </p>
      <div class="grid-left-content">
        <el-tree
          class="filter-tree"
          :data="treeAllDatas"
          :props="defaultProps"
          :highlight-current="true"
          :filter-node-method="filterNode"
          @node-click="getCurrentNodeData"
          ref="treeProDatas">
        </el-tree>
      
      </div>

    </div>
  </div>
</template>
<script>
  import types from '../../store/project/types'
  import {mapGetters } from 'vuex';
	export default{
		name:'tree',
		data(){
			return {
				filterText: '',
        defaultActive:1,
        menuData:['cases','case_groups','procedures'],
        treeAllDatas:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
			}
		},
    computed:{
      ...mapGetters({
          vxGlobal_curProjectDcs: types.GETTERS.curProjectDcs,
      }),
    },
    created(){
      let vm = this 
      vm.initMenuTreeDatas()
    },
		watch: {
       filterText(val) {
        this.$refs.treeProDatas.filter(val);
      }
    },

    methods: {
      initMenuTreeDatas(){
        let vm = this
        let treeDatas = {}
        treeDatas.level = 1
        vm.$_.forEach(vm.menuData, p_item=>{
          let child = vm.vxGlobal_curProjectDcs[p_item].map(item=>{
            return {
              label: item.name,
              currentLevel:p_item,
              number:item.number,
              level: 2
            }
          })
          treeDatas = {
            label:p_item,
            currentLevel:null,
            children: child
          }
          vm.treeAllDatas.push(treeDatas)
        })
      },
      getCurrentNodeData(value, data, node){
        let vm = this
        vm.$bus.$emit('currentProKey', value)
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
     
    },
	}
</script>