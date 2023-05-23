<template>
  <div>
    <!-- 导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 视图 -->
    <el-card>
      <!-- 搜索框 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click='getUserList'></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button  type="primary" @click="adddDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户数据 -->
      <el-table :data="userlist" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <template v-slot="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template v-slot="scope">
            <el-tooltip effect="dark" content="修改角色" placement="top">
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
              </el-tooltip>
            <el-tooltip effect="dark" content="删除角色" placement="top">
                  <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUser(scope.row.id)"></el-button>
              </el-tooltip>
            <!-- 文字提示 -->
            <el-tooltip effect="dark" content="分配角色" placement="top">
              <!-- 按钮 -->
                  <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRole(scope.row)"></el-button>
                </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[1, 2, 5, 10]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
    </el-card>
    <!-- 用户添加对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="adddDialogVisible"
      width="50%" @close="adddDialogClosed">
      <!-- 内容主体 -->
      <el-form :model="addForm" :rules="addFormrule" ref="addFormref" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="adddDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog
      title="修改用户数据"
      :visible.sync="edDialogVisible"
      width="50%" @click="editDialogClosed()">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormref" label-width="70px" class="demo-ruleForm">
        <el-form-item label="用户">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="edDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="edtiUserInfo">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="分配角色"
      :visible.sync="setRoleDialogVisible"
      width="50%" @close="setRoleDialogclose">
      <div>
        <p>当前的用户：{{userinfo.username}}</p>
        <p>当前的角色：{{userinfo.role_name}}</p>
        <el-select v-model="selecttrole" placeholder="请选择">
            <el-option
              v-for="item in roleslist"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default{
    data() {
      //正则校验规则
      var checkEmail = (rule,value,cb) =>{
        const regEmail =/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        if(regEmail.test(value)) {
          return cb()
        }
          cb(new Error('邮箱格式错误'))
      }
      //正则校验规则
      var checkMobile = (rule,value,cb) =>{
        const regMobile =/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
        if(regMobile.test(value)){
          return cb()
        }
        cb(new Error('手机号输入错误'))
      }
      return{
        queryInfo:{
          query:'',
          pagenum:1,
          pagesize:2
        },
        userlist:[],
        total:0,
        //对话框显示与隐藏
        adddDialogVisible:false,
        // 添加用户数据
        addForm:{
          username:'',
          password:'',
          email:'',
          mobile:'',
        },
        //添加用户数据规则
        addFormrule:{
          username:[
            {required:true, message:'请输入用户名字', trigger:'blur'},
            {min:3,max:10,message:'用户名字的长度在3~10',trigger:'blur'}],
        password:[
            {required:true, message:'请输入密码', trigger:'blur'},
            {min:6,max:15,message:'密码的长度在6~15',trigger:'blur'}],
        email:[
          {required:true, message:'请输入邮箱', trigger:'blur'},
          {validator: checkEmail,trigger:'blur'}],
        mobile:[
          {required:true, message:'请输入用户手机号', trigger:'blur'},
          {validator: checkMobile,trigger:'blur'}],

        },
        //修改用户对话框是否隐藏
        edDialogVisible:false,
        editForm:{},
        editFormRules: {
          email:[
            {required:true, message:'请输入用户邮箱', trigger:'blur'},
            {validator: checkEmail,trigger:'blur'}
          ],
          mobile:[
            {required:true, message:'请输入用户手机号', trigger:'blur'},
            {validator: checkMobile,trigger:'blur'}]
        },
        setRoleDialogVisible:false,
        userinfo:{},
        roleslist:[],
        selecttrole:''

      }
    },
    created() {
      this.getUserList()
    },
    methods:{
      async getUserList() {
        const{data: res} = await this.$http.get('users',{params:this.queryInfo})
        if(res.meta.status !== 200) return this.$message.error("获取用户列表失败")
        this.userlist = res.data.users
        this.total = res.data.total
        console.log(res)
      },
      handleSizeChange(newSize){
        this.queryInfo.pagesize = newSize
        this.getUserList()
      },
      handleCurrentChange(newPage){
        console.log(newPage)
        this.queryInfo.pagenum = newPage
        this.getUserList()
      },
      async userStateChanged(userinfo){
        const {data:res} = await this.$http.put(
      `users/${userinfo.id}/state/${userinfo.mg_state}`)
        if (res.meta.status !== 200){
          userinfo.mg_state = !userinfo.mg_state
          return this.$message.error("更新用户状态失败")
        }
        this.$message.success("更新用户状态成功")
      },
      adddDialogClosed(){
        this.$refs.addFormref.resetFields()
      },
      //添加用户数据
      addUser(){
        this.$refs.addFormref.validate( async valid=>
        {
          if (!valid) return Error()
          const {data:res} = await this.$http.post('users',this.addForm)
          if (res.meta.status !== 201){
            this.$message.error("添加用户失败")
          }
          this.$message.success("添加用户成功")
          this.adddDialogVisible = false
          this.getUserList()
        })
      },
       async showEditDialog(id){
        const {data:res} = await this.$http.get('users/'+id)
        if (res.meta.status !==200){
          this.$message.error("展开修改用户界面失败")
        }
        this.editForm = res.data
        this.edDialogVisible = true
      },
      editDialogClosed(){
        this.$refs.addFormref.resetFields()
      },
      edtiUserInfo(){
        this.$refs.editFormref.validate(async vaild =>
        {
          if(!vaild) return Error()
          const {data:res} = await this.$http.put('users/'+this.editForm.id,{email:this.editForm.email,mobile:this.editForm.mobile})
          if(res.meta.status !=200){
            this.$message.error("修改用户失败")
          }
          this.edDialogVisible = false
          this.getUserList()
          this.$message.success("修改用户成功")
        })

      },
      //删除操作函数
     async removeUser(id){
        const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).catch(err => err)
         if(confirmResult !== 'confirm'){
           return this.$message.info("已取消删除")
         }
         const {data:res} = await this.$http.delete('users/'+id)
         if(res.meta.status !=200){
           this.$message.error("删除用户失败")
         }
         this.getUserList()
         this.$message.success("删除用户成功")
      },
      async setRole(userinfo){
        this.userinfo = userinfo
        const {data:res} = await this.$http.get('roles')
        if (res.meta.status !==200){
          this.$message.error("获取角色列表失败")
        }
        this.roleslist = res.data
        this.setRoleDialogVisible = true
      },
      async saveRoleInfo(){
        if(!this.selecttrole){
         this.$message.error("请选择要分配的角色")
        }
        const {data:res} = await this.$http.put(`users/${this.userinfo.id}/role`,{rid:this.selecttrole})
        if (res.meta.status !==200){
           return this.$message.error("更新角色列表失败")
          }
          this.$message.success("更新角色列表成功")
          this.getUserList()
          this.setRoleDialogVisible = false
      },
      setRoleDialogclose(){
        this.selecttrole = ''
        this.userinfo = {}
      }
      // async userStateChanged(userinfo) {
      //       console.log(userinfo)
      //       const { data: res } = await this.$http.put(
      //         `users/${userinfo.id}/state/${userinfo.mg_state}`
      //       )
      //       if (res.meta.status !== 200) {
      //         userinfo.mg_state = !userinfo.mg_state
      //         return this.$message.error('更新用户状态失败！')
      //       }
      //       this.$message.success('更新用户状态成功！')
      //     }
    }
  }
</script>

<style lang="less" scoped>
</style>
