<template>
 <div>
          <p class="mb20 tar"><el-button type="primary" @click="status.dialogAddVisible = true" size="mini" >新建趋势点</el-button></p>
          <el-table :data="trendPointData">
            <el-table-column property="sort" label="序号" width="80"></el-table-column>
            <el-table-column property="point_name" label="趋势点名称" width="150"></el-table-column>
            <el-table-column property="attributes" label="趋势点属性" width="150"></el-table-column>
            <el-table-column property="description" label="板卡型号/地址"></el-table-column>
          </el-table>
          <el-dialog
            width="20%"
            title="新建趋势点"
            :visible.sync="status.dialogAddVisible"
            x>
            <el-form :model="addTrendPointFrom" status-icon :rules="rules" ref="formName" label-width="100px" class="demo-ruleForm">
              <el-form-item label="趋势点名称" prop="point_name">
                <el-input type="text" v-model="addTrendPointFrom.point_name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="颜色属性">
                <el-select v-model="addTrendPointFrom.point_color" placeholder="活动区域">
                  <el-option  v-for="color in colors" key="color.id" :label="color.color_name" :value="color.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="趋势点描述" prop="description">
                <el-input type="textarea" v-model="addTrendPointFrom.description" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('addTrendPointFrom')">提交</el-button>
                <el-button @click="resetForm('addTrendPointFrom')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
 </div>
</template>
<script>
   const trendPointData = [{
          point_name: '绑匪上',
          sort: '1',
          attributes:'dxx',
          description: 'guest'
        }, {
          point_name: '2016',
          sort: '2',
          attributes:'dxx',
          description: 'administrator'
        }, {
          point_name: '2016',
          sort: '3',
          attributes:'dxx',
          description: 'administrator'
        }, {
          point_name: '2016',
          sort: '5',
          attributes:'dxx',
          description: 'administrator'
        }]
    const colors =[
     {color_name:'红色', id:1},
     {color_name:'白色', id:2},
     {color_name:'黄色', id:3},
     {color_name:'棕色', id:4},
     {color_name:'褐色', id:5},
     {color_name:'黑色', id:6},
     {color_name:'灰色', id:7}
    ]
    export default {
    	name:'trendGroupManagement',
      data() {
      return {
      	status:{
          dialogAddVisible:false,
      	},
        addTrendPointFrom: {
          point_name: '',
          point_color:'',
          description:''
        },
        colors:colors,
        trendPointData: trendPointData,
        rules: {
          point_name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
      }
    },
    methods:{
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

  };
</script>