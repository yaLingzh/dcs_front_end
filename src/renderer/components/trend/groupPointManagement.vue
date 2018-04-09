<template>
 <div>
    <template>
        <el-table :data="groupPointData">
          <el-table-column property="sort" label="序号" width="80"></el-table-column>
          <el-table-column property="group_name" label="组名称"></el-table-column>
          <el-table-column property="points" label="点集"></el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="50">
              <template slot-scope="scope">
                <el-button @click="status.dialogPointsVisible = true" type="text" size="small">设置</el-button>
              </template>
            </el-table-column>

            <el-dialog
              width="50%"
              title="用户权限设置"
              :visible.sync="status.dialogPointsVisible"
              append-to-body>
              <template>
                <p>一级菜单</p>
                <div><el-checkbox :indeterminate="status.levelMenuIs" v-model="status.levelMenuCheckAll" @change="levelMenuAllChange">全选</el-checkbox></div>
                <div style="margin: 15px 0;">
                  <el-checkbox-group v-model="checkedMenu" @change="CheckedLevelMenuChange">
                    <el-checkbox v-for="menu in levelMenu" :label="menu" :key="menu">{{menu}}</el-checkbox>
                  </el-checkbox-group>
                </div>
               </template>

            </el-dialog>
          </el-dialog>

        </el-table>
    </template>
 </div>
</template>
<script>
  const levelMenu1 = ['View','Project','Test','Performance Test','Variable Forcing', 'Trends', 'TrendFullScreen', 'Close','SignalSimu','Report','Record','Help','Account','Log Out']
    export default {
    	name:'groupPointManagement',
      data() {
      return {
      	status:{
          dialogPointsVisible:false,
          levelMenuIs:false,
          levelMenuCheckAll: false,
      	},
        checkedMenu:null,
        levelMenu:levelMenu1,
      
        groupPointData: [{
          group_name: '2016-05-02',
          sort: '12',
          points: 'guest'
        }, {
          group_name: '2016',
          sort: '12',
          points: 'administrator'
        }, {
          group_name: '2016',
          sort: '12',
          points: 'administrator'
        }, {
          group_name: '2016',
          sort: '12',
          points: 'administrator'
        }],

        rules: {
          group_name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          
        }
        
      
      }
    },
    methods:{

       /*选择*/
      levelMenuAllChange(val) {
        this.checkedMenu = val ? levelMenu1 : [];
        this.levelMenuIs = true;
      },
      CheckedLevelMenuChange(value) {
        let checkedCount = value.length;
        this.levelMenuCheckAll = checkedCount === this.levelMenu.length;
        this.levelMenuIs = checkedCount > 0 && checkedCount < this.levelMenu.length;
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
    components:{
    }

  };
</script>