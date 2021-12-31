<template>
  <div class="home-div">
      <MenuList class="menu"></MenuList>
  </div>
</template>

<script>
import MenuList from '../childCom/Menu.vue'
export default {
    components:{
        MenuList
    },
    methods:{
       
    }
}
</script>

<style lang="scss" scoped>
.home-div{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>