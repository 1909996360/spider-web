<template>
  <div class="welcome-div">
    <div class="content-view">
       <img class="image" src="../../assets/logo.png" alt="">
        <p class="ptext">vue欢迎您</p>
    </div>
     
  </div>
</template>

<script>

export default {
    created(){
    }
}
</script>

<style lang="scss" scoped>
.welcome-div{
  width: 100%;
  height: 100%;
  position: relative;
  .content-view{
    position: absolute;
    top: calc(50% - 200px);
    width: 400px;
    height: 400px;
    text-align: center;
    left: calc(50% - 200px);
    .image{
      border-radius: 50%;
      width: 200px;
      height: 200px;
      background: #ccc;
      margin-top: 100px;
    }
    .ptext{
      font-size: 20px;
    }
  }
  
}
</style>