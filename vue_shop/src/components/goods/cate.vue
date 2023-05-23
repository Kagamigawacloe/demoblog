<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 添加商品按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="showcatedialogVisible">添加分类</el-button>
        </el-col>
      </el-row>
      <tree-table :data="catelist" :columns="columns" :selection-type="false" :expand-type="false" show-index border
      ><template v-slot:isok="scope">
        <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color: lawngreen;"></i>
        <i class="el-icon-error" v-else style="color: red;"></i>
      </template>
      <template v-slot:order="scope">
        <el-tag size="mini" v-if="scope.row.cat_level==0">一级</el-tag>
        <el-tag size="mini" type="success" v-else-if="scope.row.cat_level==1">二级</el-tag>
        <el-tag size="mini" type="warning" v-else>三级</el-tag>
      </template>
      <template v-slot:opt="">
        <el-button type="primary" icon="el-icon-deit" size="mini">编辑</el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
      </template>
      </tree-table>
      <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="querInfo.pagenum"
            :page-sizes="[3, 5, 10, 20]"
            :page-size="querInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
    </el-card>
    <el-dialog
      title="添加分类"
      :visible.sync="addcatedialogVisible"
      width="50%">
      <el-form ref="addcteformref" :model="addcateform" label-width="80px" :rules="addcateformrules">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addcateform.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级名称">
          <el-cascader
              v-model="selectkey"
              :options="parncatelist"
              expand-trigger="hover"
               :props="cateprops"
               @change="cateChange"
               clearable></el-cascader>
        </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addcatedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addcatedialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        querInfo: {
                type: 3,
                pagenum: 1,
                pagesize: 5
              },
              // 商品分类的数据列表，默认为空
              catelist: [],
              total:0,
              columns:[{
                label:'分类名称',
                prop:'cat_name'
              },
              {
                label:'是否有效',
                type:'template',
                template:'isok'
              },
              {
                label:'排序',
                type:'template',
                template:'order'
              },
              {
                label:'操作',
                type:'template',
                template:'opt'
              }],
              addcatedialogVisible:false,
              addcateform:{
                cat_name:"",
                cat_pid:0,
                cat_level:0
              },
              addcateformrules:{
                cat_name:[
                  {required:true,message:"请输入分类名称",trigger:'blur'}
                ]
              },
              parncatelist:[],
              cateprops:{
                value: 'cat_id',
                label: 'cat_name',
                children: 'children'
              },
              selectkey:[]
      }
    },
    created() {
      this.getCateList()
    },
    methods:{
       async getCateList() {
            const { data: res } = await this.$http.get('categories', {
              params: this.querInfo
            })

            if (res.meta.status !== 200) {
              return this.$message.error('获取商品分类失败！')
            }

            console.log(res.data)
            this.catelist = res.data.result
            this.total = res.data.total
            },
            handleSizeChange(newszie){
              this.querInfo.pagesize = newszie
              this.getCateList()
            },
            handleCurrentChange(newpage){
              this.querInfo.pagenum = newpage
              this.getCateList()
            },
            showcatedialogVisible(){
              this.getcatelist()
              this.addcatedialogVisible =true
            },
      async getcatelist(){
              const {data:res} = await this.$http.get('categories',{params:{type:2}})
              if (res.meta.status !==200){
                this.$message.error("获取父级列表失败")
              }
              this.parncatelist = res.data
            },
            cateChange(){
              console.log(this.selectkey)
            }
    }
  }
</script>

<style>
  .el-cascader-panel{height: 250px;}
</style>
<style lang="less" scoped></style>
