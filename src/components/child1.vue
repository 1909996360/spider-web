<template>
  <div>
      child1
      age:{{$attrs.age}}
      child1:{{$attrs}}
      <Child2 v-bind="$attrs"></Child2>
  </div>
</template>

<script>
import Child2 from './child2.vue'
export default {
    components:{Child2},
    inject:['provideValue'],
    // props:{age:String},
    created(){
        console.log('child1',this.$attrs);
        console.log('child1',this.provideValue);
    }

}
</script>

<style>

</style>