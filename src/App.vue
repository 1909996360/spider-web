<template>
  <div id="app">
    <router-view></router-view>
  </div>
  
</template>

<script>

export default {
  created(){
    if(sessionStorage.getItem('userInfo')){
      this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("userInfo"))))
    }

    window.addEventListener('beforeunload', ()=>{
      sessionStorage.setItem('userInfo',JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style lang="scss" scoped>
#app{
  width: 100vw;
  height: 100vh;
}
</style>
