<template>
  <div>
     <div>
         name:{{name}}
         childAttrs:{{$attrs}}
         </div> 
     <Child1 v-bind="$attrs"></Child1>
     <!-- <div>
         <button @click ="getDatas">子组件的触发</button>
     </div> -->
    </div>
</template>

<script>
import Child1 from './child1.vue'
import Bus from '../utils/bus'
export default {
    props:{name:String},
    components:{Child1},
    inject:['provideValue'],
    data(){
        return{
            // name:''
        }
    },
    created(){
        // Bus.$on('val',(data) =>{
        //         this.name = data + '11'
        //         console.log('触发了子组件的bus');
        //     })
        console.log('child',this.$attrs);
        console.log('child',this.provideValue);
    },
    methods:{
        getDatas(){
            
        }
    }
}
</script>

<style>

</style>