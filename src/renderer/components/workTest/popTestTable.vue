<template>
 <div>
 	<el-dialog title="中止规程列表" width="60%":visible.sync="dialogTestInfoVisible">
 		<test-tabel :tableListData="stopListData"></test-tabel>
 	</el-dialog>
 </div>
</template>
<script>
    export default {
    data() {
      return {
        dialogTestInfoVisible: false,
        stopListData:null,
      }
    },
    methods:{
       initStopListDatas(){
          let vm = this
          let url = '/run/result/incomplete'
          vm.$axios.get(url).then(response=>{
            if(response.status == 200){
              vm.stopListData = response.data.data
            }
          })
        },
    },
    mounted(){
      let vm = this
      vm.$bus.$on('stopDcsListShow', (msg) => {
         vm.dialogTestInfoVisible = msg
       })
      vm.initStopListDatas()
    },
    components:{
      testTabel: resolve => require(['./testTable.vue'], resolve),
    }

  };
</script>