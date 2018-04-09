<template>
 <div>
 	<el-dialog title="网络环境配置" :visible.sync="dialogSeamVisible">
 		<p class="dialogButtonBox">
      <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          >
          <el-button size="small" type="primary">导入</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      <!-- <el-button type="primary" size="mini" >导入</el-button> -->
    </p>
	  <el-table :data="envSeamData">
	    <el-table-column property="sort" label="序号" width="80"></el-table-column>
	    <el-table-column property="jigui" label="机柜"></el-table-column>
	    <el-table-column property="description" label="描述"></el-table-column>
	    <el-table-column property="ip_address" label="IP地址"></el-table-column>
	    <el-table-column property="port" label="端口"></el-table-column>
	  </el-table>
	</el-dialog>
 </div>
</template>
<script>
    export default {
    name:'seam',
    data() {
    	var groutName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('组名称不能为空'));
        }
      };
      return {
      	status:{
      	},
      	fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        envSeamData: [{
          sort: '6',
          ip_address:'10.120.23.15',
          jigui:'123',
          description:'90',
          port:'14'
        }, {
          sort: '6',
          ip_address:'10.120.23.15',
          jigui:'123',
          description:'90',
          port:'14'
        }, {
          sort: '6',
          ip_address:'10.120.23.15',
          jigui:'123',
          description:'90',
          port:'14'
        }, {
          sort: '6',
          ip_address:'10.120.23.15',
          jigui:'123',
          description:'90',
          port:'14'
        }],
        dialogSeamVisible: false,
      
      }
    },
    methods:{
       handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
    	submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
    mounted(){
      let vm = this
      vm.$bus.$on('networkSet', (msg) => {
         vm.dialogSeamVisible = msg
       })
    },


  };
</script>