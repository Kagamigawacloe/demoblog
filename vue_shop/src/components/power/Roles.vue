<template>
<div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加角色按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>

      <!-- 角色列表区域 -->
      <el-table :data="roleslist" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row :class="['bdbottom',i1 === 0 ? 'bdtop' : '','vcenter']" v-for="(item1,i1) in scope.row.children" :key="item1.id">
              <!-- 渲染一级权限 -->
              <el-col :span="5">
               <!-- <pre>{{scope.row.children}}</pre> -->
                <el-tag closable @close="RemoveRolesTag(scope.row,item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
                </el-col>
                <!-- 渲染二级 -->
                <el-col :span="19">
                  <el-row :class="['bdbottom',i2 === 0 ? '' : 'bdtop','vcenter']" v-for="(item2,i2) in item1.children" :key="item2.id">
                    <el-col :span="6">
                      <el-tag type="success" closable @close="RemoveRolesTag(scope.row,item2.id)">{{item2.authName}}</el-tag>
                      <i class="el-icon-caret-right"></i>
                    </el-col>
                    <!-- 三级渲染 -->
                    <el-col :span="18">
                      <el-tag :class="['bdbottom',i3 === 0 ? '' : 'bdtop']" v-for="(item3,i3) in item2.children" :key="item3.id" type="warning" closable
                      @close="RemoveRolesTag(scope.row,item3.id)">
                        {{item3.authName}}
                      </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
            </el-row>
            <!-- <pre>{{scope.row}}</pre> -->
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            <el-button size="mini" type="warning" icon="el-icon-setting" @click="showSetRightDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="50%" @close="defkeyclose">
      <!-- 树形结构 -->
      <el-tree :data="rightslist" :props="treeProps" show-checkbox node-key="id" default-expand-all :default-checked-keys="defkey" ref="treeRef"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRigts">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        roleslist:[],
        setRightDialogVisible:false,
        rightslist: [],
        treeProps:{
          children: 'children',
          label: 'authName'
        },
        defkey:[],
        roleId:''
      }
    },
    created() {
      this.getRoleslist()
    },
    methods:{
      async getRoleslist(){
        const {data:res} =await this.$http.get('roles')
          if(res.meta.status !==200){
            return this.$message.error('获取角色列表失败')
        }
        this.roleslist =res.data
        console.log(this.roleslist)
      },
      async RemoveRolesTag(role,rightid){
        const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).catch(err => err)
         if(confirmResult !== 'confirm'){
           return this.$message.info("已取消删除")}
           const {data:res} = await this.$http.delete(`roles/${role.id}/rights/${rightid}`)
           if(res.meta.status !=200){
               this.$message.error("删除权限失败")
           }
           //this.getRoleslist()
           // this.$message.success("删除权限成功")
           role.children = res.data
      },
      async showSetRightDialog(role){
        this.roleId =role.id
        const { data: res } = await this.$http.get('rights/tree')

              if (res.meta.status !== 200) {
                 this.$message.error('获取权限数据失败！')
              }
              this.rightslist = res.data
              this.getdefkey(role,this.defkey)
        this.setRightDialogVisible = true
      },
      getdefkey(node,arr){
        if(!node.children){
          return arr.push(node.id)
        }
        node.children.forEach(item => this.getdefkey(item,arr))
      },
      defkeyclose(){
        this.defkey=[]
      },
      async allotRigts(){
        const key=[...this.$refs.treeRef.getCheckedKeys(),...this.$refs.treeRef.getHalfCheckedKeys()]
        const idStr = key.join(',')
        const { data: res } = await this.$http.post(`roles/${this.roleId}/rights`,{ rids: idStr })
        if(res.meta.status !=200){
            this.$message.error("分配权限失败！")
        }
        this.$message.success('分配权限成功！')
        this.getRoleslist()
        this.setRightDialogVisible = false
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-tag{
    margin: 7px;
  }
  .bdtop{
    border-top: 1px solid #EEEEEE
  }
  .bdbottom{
    border-bottom: 1px solid #EEEEEE;
  }
  .vcenter{
    display: flex;
    align-items: center;
  }
</style>
