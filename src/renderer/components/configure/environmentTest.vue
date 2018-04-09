<template>
 <div>
 	<el-dialog title="测试环境配置" width="57%" :visible.sync="dialogEnvVisible">
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
	  <el-table :data="envTestData">
	    <el-table-column property="sort" label="序号" width="80"></el-table-column>
	    <el-table-column property="num" label="机柜号" width="150"></el-table-column>
	    <el-table-column property="ip_num" label="机柜IP地址" width="130"></el-table-column>
	    <el-table-column property="xinhao" label="板卡型号/地址" width="150"></el-table-column>
	    <el-table-column property="tongdao" label="通道号" width="80"></el-table-column>
	    <el-table-column property="port" label="端子号" width="100"></el-table-column>
	    <el-table-column property="veria" label="模型变量" width="100"></el-table-column>
	    <el-table-column property="dcs_num" label="DCS机柜号" width="100"></el-table-column>
	    <el-table-column property="dcs_ip" label="DCS IP地址" width="150"></el-table-column>
	    
	  </el-table>
	</el-dialog>
 </div>
</template>
<script>
    export default {
    	name:'environmentTest',
      data() {
    	var groutName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('组名称不能为空'));
        }
      };
      return {
        dialogEnvVisible: false,
        envTestData: [{
          num: '2016-05-02',
          sort: '12',
          ip_num:'10.120.23.15',
          xinhao: 'guest',
          tongdao:'123',
          port:'90',
          veria:'e',
          dcs_num:'14',
          dcs_ip:'10.20.12.113'
        }, {
          num: '2016',
          sort: '12',
          ip_num:'10.120.23.15',
          xinhao: 'administrator',
          tongdao:'123',
          port:'90',
          veria:'e',
          dcs_num:'14',
          dcs_ip:'10.20.12.113'
        }, {
          num: '2016',
          sort: '12',
          ip_num:'10.120.23.15',
          xinhao: 'administrator',
          tongdao:'123',
          port:'90',
          veria:'e',
          dcs_num:'14',
          dcs_ip:'10.20.12.113'
        }, {
          num: '2016',
          sort: '12',
          ip_num:'10.120.23.15',
          xinhao: 'administrator',
          tongdao:'123',
          port:'90',
          veria:'e',
          dcs_num:'14',
          dcs_ip:'10.20.12.113'
        }],
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
      }
    },
    mounted(){
      let vm = this
       vm.$bus.$on('testEnv', (msg) => {
         vm.dialogEnvVisible = msg
       })
    },

  };
</script>