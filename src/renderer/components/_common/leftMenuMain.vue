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
        treeAllData:[],
        defaultCheckedKeys:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
			}
		},
    computed:{
      ...mapGetters({
          vxGlobal_curProjectDcs: types.GETTERS.curProjectDcs,
      }),
      treeAllDatas(){
        return this.treeAllData
      }
    },
    created(){
      let vm = this 
      vm.initMenuTreeDatas()
    },
    mounted(){
      let vm = this 
      vm.$bus.$on('currentRunDcs', msg=>{
        if(!msg) return
        if(msg.isStopData){
          vm.getRepeatData(msg)
        }
        vm.defaultCheckedKeys = []
        vm.$refs.treeProDatas.setCheckedKeys([]);
        vm.$nextTick(()=>{
          vm.needSetCheckedKeys(msg)
          vm.getCheckedNodes()  
        })
      })
    },
		watch: {
       filterText(val) {
        this.$refs.treeProDatas.filter(val);
      }
    },

    methods: {
      _initCurrentOpenPro,
      /**
       * @Author      supper520love@126.com
       * @DateTime    2018-05-29
       * @discription {{是否有重复的结点数据}}
       * @param       {viue选中要运行的 dcs obj}
       * @requires    {无}
       * @return      {booleran}
       * @version     [01]
       * @return      {[type]}                  [description]
       */
      getRepeatData(obj){
        let vm = this
        let objData = JSON.parse(JSON.stringify(obj))
        let isRepatData = vm.$_.map(vm.treeAllDatas, (item, index)=>{
          // if(item.children){
          //   let getRepeatNode = item.children.map(node_item => {return node_item.number == obj.number && node_item.currentLevel == obj.type})
          //   if(vm.$_.has(getRepeatNode, true)){
          //     return true
          //   }else{
          //     return false
          //   }
          // } 
          if(item.label == objData.label){
            return true
          }else{
            return false
          }
        })
        let isTrue = vm.$_.toString(isRepatData.filter(item =>{return item == true}))
        if(isTrue == 'true'){
          vm.$message.warning('已经在运行规程中！');
          return false
        }else{
          vm.treeAllData.push(obj) 
        }
      },
      /**
       * @Author      supper520love@126.com
       * @DateTime    2018-05-29
       * @discription {{初始化结点数据}}
       * @param       {}
       * @requires    {}
       * @return      {}
       * @version     [version]
       * @return      {[obj]}              [description]
       */
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
          vm.treeAllData.push(treeDatas)
        })
        // console.log(vm.treeAllDatas, 'treeAllDatas')
      },
      getCurrentNodeData(value, data, node){
        let vm = this
        vm.defaultCheckedKeys = []
        vm.$refs.treeProDatas.setCheckedKeys([]);
        vm.$bus.$emit('currentProKey', value)
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      /**
       * @Author      supper520love@126.com
       * @DateTime    2018-05-29
       * @discription {{设置默认选中接点}}
       * @param       {当前接点信息}
       * @requires    {}
       * @return      {选中接点}
       * @version     [version]
       * @param       {[obj]}              datas [description]
       * @return      {[obj]}                    [description]
       */
      needSetCheckedKeys(datas){
        let vm = this
        vm.defaultCheckedKeys = []
        if(!datas.isStopData){
          vm.treeAllDatas.forEach(p_item=>{ 
            let nodeKeys = p_item.children.filter(c_child=>{
              return datas.number == c_child.number && datas.type == c_child.obj_type
            })
            if(!vm.$_.isEmpty(nodeKeys)){
              vm.defaultCheckedKeys.push(nodeKeys[0].id)
            } 
          })
        }else{
            vm.defaultCheckedKeys.push(datas.id)
        }
        vm.$refs.treeProDatas.setCheckedKeys([]);
        vm.$refs.treeProDatas.setCheckedKeys(_.flatten(vm.defaultCheckedKeys))
      },
      /**
       * @Author      supper520love@126.com
       * @DateTime    2018-05-29
       * @discription {{获取当前选中接点}}
       * @param       {}
       * @requires    {}
       * @return      {}
       * @version     [01]
       * @return      {[obj]}              [description]
       */
      getCheckedNodes() {
        let vm = this
        let nodeKey = this.$refs.treeProDatas.getCheckedKeys()
        let nodeData = this.$refs.treeProDatas.getCheckedNodes()
        vm.$bus.$emit('currentProKey', nodeData[0])
      },
     
    },
	}
</script>