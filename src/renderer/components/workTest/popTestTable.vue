<template>
 <div>
 	<el-dialog title="中止规程列表" width="40%":visible.sync="dialogTestInfoVisible">
 		<test-tabel :testListData="testListData"></test-tabel>
 	</el-dialog>
 </div>
</template>
<script>
	const testListData =[{
					num:'123443',
					test_num:'234231',
					is_over:'是',
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          num:'123443',
          test_num:'234231',
          is_over:'是',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          num:'123443',
          test_num:'234231',
          is_over:'是',
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          num:'123443',
          test_num:'234231',
          is_over:'是',
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          num:'123443',
          test_num:'234231',
          is_over:'是',
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          num:'123443',
          test_num:'234231',
          is_over:'是',
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          num:'123443',
          test_num:'234231',
          is_over:'是',
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
    export default {
    data() {
      return {
        dialogTestInfoVisible: false,
        testListData:testListData,
      }
    },
    methods:{
    },
    mounted(){
      let vm = this
      vm.$bus.$on('stopTestList', (msg) => {
         vm.dialogTestInfoVisible = msg
       })
    },
    components:{
      testTabel: resolve => require(['./testTable.vue'], resolve),
    }

  };
</script>