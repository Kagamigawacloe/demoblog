<template>
  <el-container>
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="">
        <span>后台管理</span>
      </div>
      <el-button type="info" @click="homeout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="iscollapae ? '64px': '100px'">
        <div  class="toggle-button" @click="toggleCollapse">|||</div>
        <!--菜单区域-->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409FFF"
        :unique-opened="true" :collapse="iscollapae" :collapse-transition="false" :router="true"
        :default-active="activePath">
          <!-- 一级菜单 -->
          <el-submenu :index="String(item.id)" v-for="item in menulist" :key="item.id">
            <template slot="title">
              <!--图标-->
              <i :class="iconobject[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
              <el-menu-item :index="String(subItem.path)" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState(subItem.path)">
                <template slot="title">
                <!--图标-->
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
              </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menulist: [],
      iconobject: {
              '125': 'iconfont icon-user',
              '103': 'iconfont icon-tijikongjian',
              '101': 'iconfont icon-shangpin',
              '102': 'iconfont icon-danju',
              '145': 'iconfont icon-baobiao'
      },
      iscollapae: true,
      activePath: ''
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods:{
    homeout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
   async getMenuList() {
     const{data: res} = await this.$http.get('menus')
     if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
     this.menulist = res.data
     console.log(res)
    },
    toggleCollapse(){
      this.iscollapae = !this.iscollapae
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath = activePath
    }
  }
}

</script>

<style lang="less" scoped>
.el-header{
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding: 0;
  align-items: center;
  color: white;
  font-size: 20px;
  >div{
    display: flex;
    align-items: center;
    span{
      margin-left: 15px;
    }
  }
}
.el-aside{
  background-color: #333744;
}
.el-main{
  background-color: #eaedf1;
}
.el-container{
  height: 100%;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
