<template>
  <div id="app">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>      
      <el-menu-item index="/" style="font-weight:600;"><div style="float:left;font-size:20px;">OnePig  寻找你身边的给力折扣</div><div style="float:left;margin-left:40px">感兴趣的店铺，请移步大众点评搜索即可</div></el-menu-item>   
      
    </el-menu>    
    <router-view/>
    
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
