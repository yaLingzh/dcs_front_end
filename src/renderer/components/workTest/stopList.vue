<template>
<div>
		 <work-test-table :testListData="testListData"></work-test-table>
</div>
</template>

<script>
 export default{
		name:'trend',
		data(){
			return {
				dataFrom:{
					name:null,
					type:null,
					over:null,
					num:null,
				},
				testListData: [{
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
			}
		},
		methods:{
			 onSubmit() {
        console.log('submit!');
      }
		},
		components:{
			workTestTable: resolve => require(['./testTable.vue'], resolve),
		}

  }
</script>