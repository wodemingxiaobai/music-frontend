<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
   <Footer></Footer>
   <AudioPlayer /> <!-- 添加播放器组件 -->
  </div>
</template>
<script>

export default {
name:'App',
components:{
 
}
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


</style>
