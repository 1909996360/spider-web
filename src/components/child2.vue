<template>
  <div>
      child2:{{$attrs}}
  </div>
</template>

<script>
export default {
    // props:{
    //     sex:String,
    //     job:String
    // },
    inject:['provideValue'],
    created(){
        console.log('child2',this.$attrs);
        console.log('child2',this.provideValue);
    }

}
</script>

<style>

</style>