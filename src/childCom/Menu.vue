<template>
  <div class="menu-box">
     <el-header class="header">
       <div class="title" >
            <img class="img" src="../assets/logo.png" /><span class="span">蜘蛛系统</span> 
        </div>
       <div class="text" :style="`padding-left:${showIcon ? '173':'23'}px`">{{'顶部区域'}}</div>
       <div class="right">
         <el-avatar :src="this.userInfo.avatarUrl && this.userInfo.avatarUrl != '' ? this.userInfo.avatarUrl : noneImage" class="image" ></el-avatar>
         <span class="name">{{this.userInfo.nickName && this.userInfo.nickName != '' ? this.userInfo.nickName : '未知'}}</span>
       </div>
       
       </el-header>
     <el-container :style="bodyHeight">
      <el-aside :style="`width:${showIcon ? '300':'150'}px`">    
        <el-menu
          :default-active="navselected"
          :active="navselected"
          :router="true"
          style="background-color: #545c64;color:#fff"
          >
          <el-menu-item v-for="(item,index) in menuList" :key="index" :index="item.router">{{item.name}}</el-menu-item>
          <div class="icon-div">
            <i @click="changeIcon" :class="showIcon ? 'el-icon-d-arrow-right icondiv icondiv-active' : 'el-icon-d-arrow-right icondiv'"></i>
          </div>
          
        </el-menu>
      </el-aside>
       
       <el-main class="pad10 flex-c">
           <router-view class="router-div"></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
    data(){
      return{
        navselected:'',
        bodyHeight: 0,
        userName:"",
        menuList:[
          {name:'Tab页面',router:'tab'},
          {name:'Nav页面',router:'nav'},
          {name:'空页面' ,router:'welcome'}
        ],
        showIcon:true,
        noneImage:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        userInfo:{},
        showBack:false
      }
    },
    created(){
      if(this.$store.state.userInfo){
        this.userInfo = this.$store.state.userInfo
      }
    },
    watch:{
     //监听页面路由的切换，将选中的nav动态更新
      $route(to,from){
        this.navselected=to.path.slice(1);
      },
      changeIcon(val){
        if(!val){

        }
      }
    },
    methods:{
      // 点击全局div
      changeMenu(){
        console.log('点击全局的');
        this.showBack = false
      },
      changeRight(){
        console.log('点击right的');
        this.showBack = !this.showBack
      },
      changeIcon(){
        this.showIcon = !this.showIcon
      }
    }
}
</script>

<style lang="scss" scoped>
.menu-box{
  width: 100%;
  height: 100%;
  .el-header{
      background:#272e35;
      border: none;
      color: #fff;
      // padding: 20px;
      display: flex;
      padding: 0px 20px 0px 20px;
      .title{
        transition: 0.5s all;
        padding-top: 10px;
        .img{
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #fff;
        }
        .span{
          margin-left: 10px;
        }
      }
      .text{
        transition: 0.5s all;
        color: #fff;
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        padding-top: 10px;
        // border-left: 1px dashed #ccc;
      }
      .right{
        margin-left: auto;
        color: #fff;
        line-height: 60px;
        position: relative;
        cursor: pointer;
          .image{
            vertical-align: middle;        
          }
          .name{
            margin-left: 10px;
          }
      }
      .back-div{
        position: absolute;
        width: 100px;
        height: 100px;
        border: 1px solid #ccc;
        top: 0;
        right: 0;
        background: #fff;
      }
      // border-left: 1px solid #ccc;
    }
  .el-aside{
    transition: 0.5s all;
  }
  .is-active{
      color: rgb(120, 202, 171) !important;
    }
  .el-container{
    height: 100%;
    .el-menu{
      overflow-x:hidden ;
      height: 100%;
      border: none;
      
    }
  }
  .el-menu-item{
    color: #fff;
   
  }
  .el-main{
    padding: 0;
    
    .router-div{
      padding: 20px;
      width: calc(100% - 40px);
      height: calc(100% - 100px);
    }
  }
  .aside-menu{
    position: relative;
    width: 300px;
  }
  .icon-div{
     position: absolute;
     width: 20px;
     top: 50%;
     right:5%;
    .icondiv{
      color: #fff;
      cursor: pointer;
      // border: 1px solid red;
      padding: 10px;
      transition: 0.5s all;
      &-active{
        transform: rotateY(180deg);
      }
     }
  }
  
}
</style>