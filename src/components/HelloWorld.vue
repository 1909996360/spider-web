<template>
  <div class="hello">
    <!-- <Child :name="child.name" :sex="child.sex" :age="child.age" :job="child.job" title="$attr传值"></Child> -->
    <!-- <span>{{busValue}}</span>
    <button @click="changeBus">点击父组件bus</button> -->
    <!-- <vue-ueditor-wrap v-model="msg" :config="myConfig"></vue-ueditor-wrap> -->
    <!-- <p v-if="show" ref="node">内容</p>
    <button @click="handleShow">显示</button> -->
     <iframe
          name="ueditor"
          id="ueditor"
          src="/ueditor/index.html?titlename=商品详情（必填）"
          style="width: 100%; height: 500px; border: 0px"
          @load="loadUeditor"
        ></iframe>
  </div>
</template>

<script>
// import VueUeditorWrap from 'vue-ueditor-wrap'
import Child from './child.vue'
import Bus from '../utils/bus'
export default {
  name: 'HelloWorld',
  props: {
   
  },
  provide:{
    provideValue:'zhw'
  },
  components:{
    // VueUeditorWrap,
    Child
    },
  data(){
    return{
      msg:'<img src="http://img.baidu.com/hi/jx2/j_0003.gif"/><h2>Vue + UEditor + v-model双向绑定</h2>',
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 240,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: '',
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况
        UEDITOR_HOME_URL: '/UEditor/'
      },
      show:false,
      busValue:'测试bus的value',

      child:{
        name:'zhw',
        sex:'男',
        age:'23',
        job:'前端开发'
      }
    }
  },
  methods:{
    handleShow(){
      this.show = true
      console.log(this.$refs.node); //undefined
      this.$nextTick(()=>{
        console.log(this.$refs.node); //  <p>内容</p>
      })
    },
    changeBus(){
      Bus.$emit('val',this.busValue)
      console.log('触发了父组件的bus',this.busValue);
    },
    // 获取富文本框内容
        loadUeditor() {
                // if (
                //     this.formData.content != "" &&
                //     this.formData.content != null &&
                //     this.formData.content != undefined
                // ) {
                //     var v_Obj = document.getElementById("ueditor").contentWindow; //获取iframe对象
                //     v_Obj.setContent(this.formData.content); //写入编辑器富文本内容
                // } else {
                //     // setTimeout(this.loadUeditor, 300);
                // }
            
        },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
