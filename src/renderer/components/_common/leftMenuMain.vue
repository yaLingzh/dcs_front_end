<template>
  <div>
  	<div class="grid-content grid-bg-purple-dark">
      <p class="left-menu-tree-title">项目资源 <!-- <em class class="el-icon-minus"></em> --></p>
      <p class="left-menu-tree-tool">
        <!-- <em class="iconfont icon-menu-see"></em> -->
         <el-input placeholder="请输入内容" auto-complete="on" v-model="filterText" size="mini" class="input-with-select">
          <el-button slot="append" size="mini" icon="el-icon-search"></el-button>
        </el-input>
        <em class="iconfont icon-menu-break" style="margin-left:2rem" @click="_initCurrentOpenPro"></em>
      </p>
      <div class="grid-left-content">
        <el-tree
          class="filter-tree"
          :data="treeAllDatas"
          :props="defaultProps"
          :highlight-current="true"
          :filter-node-method="filterNode"
           node-key="id"
          :default-expanded-keys="defaultCheckedKeys"
          @node-click="getCurrentNodeData"
          @current-change="getCurrentNodeData"
          ref="treeProDatas">
        </el-tree>
      </div>

    </div>
  </div>
</template>
<script>
  import types from '../../store/project/types'
  import {mapGetters } from 'vuex';
  import {_initCurrentOpenPro} from "../../util/common";
	export default{
		name:'tree',
		data(){
			return {
				filterText: '',
        defaultActive:1,
        menuData:['cases','case_groups','procedures'],
        treeAllDatas:[],
        defaultCheckedKeys:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        targetRunDcs:null,
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
      vm.$bus.$on('currentRunDcs', msg=>{
        if(!msg) return
        // vm.targetRunDcs = msg
        vm.needSetCheckedKeys(msg)
        vm.getCheckedNodes()
      })
    },
		watch: {
       filterText(val) {
        this.$refs.treeProDatas.filter(val);
      }
    },

    methods: {
      _initCurrentOpenPro,
      initMenuTreeDatas(){
        let vm = this
        let treeDatas = {}
        treeDatas.level = 1
        vm.$_.forEach(vm.menuData, (p_item, p_index)=>{
          let child = vm.vxGlobal_curProjectDcs[p_item].map((item, index)=>{
            return {
              id: item.obj_type + '_' + (index+1),
              label: item.name,
              currentLevel:p_item,
              number:item.number,
              obj_type: item.obj_type,
              level: 2
            }
          })
          treeDatas = {
            id:'parent' +'_'+ (p_index+1),
            label:p_item,
            currentLevel:null,
            children: child
          }
          vm.treeAllDatas.push(treeDatas)
        })
      },
      getCurrentNodeData(value, data, node){
        let vm = this
        vm.$refs.treeProDatas.setCheckedKeys([]);
        vm.$bus.$emit('currentProKey', value)
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },

      needSetCheckedKeys(datas){
        let vm = this
        
        vm.treeAllDatas.forEach(p_item=>{
          let nodeKeys = p_item.children.filter(c_child=>{
            return datas.number == c_child.number && datas.type == c_child.obj_type
          })
          if(!vm.$_.isEmpty(nodeKeys)){
            vm.defaultCheckedKeys.push(nodeKeys[0].id)
          }
        })
        vm.$refs.treeProDatas.setCheckedKeys(vm.$_.flatten(vm.defaultCheckedKeys))
      },
      getCheckedNodes() {
        let vm = this
        let nodeKey = this.$refs.treeProDatas.getCheckedKeys()
        let nodeData = this.$refs.treeProDatas.getCheckedNodes()
        vm.$bus.$emit('currentProKey', nodeData[0])
      },
     
    },
	}
</script>