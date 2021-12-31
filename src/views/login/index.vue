<template>
  <div class="login-container">
    <el-form @keyup.native.enter="onSubmit" ref="form" :rules="rules" :model="form" label-width="80px" class="login-form">
      <h2 class="login-title">蜘蛛管理系统</h2>
      <el-form-item label="账号" prop="username" class="username-div">
        <el-input :clearable="true" @blur.stop="nameBlurs" @focus.stop="nameFocus" v-model="form.username" maxlength="20"></el-input>
        <!-- <el-collapse-transition>
          <div class="toople-div" v-if="showToople">
            <div class="item-div">
              <div class="left"></div>
              <div class="right"></div>
            </div>
          </div>
      </el-collapse-transition> -->
        
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input  :clearable="true" placeholder="请输入密码" type="password" show-password v-model="form.password" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input placeholder="请输入验证码" class="code-input" v-model="form.code" maxlength="10"></el-input>
        <img class="image" @click="getCaptchaImage" :src="codeImage" alt="">
      </el-form-item>
      <el-form-item>
        <el-button   class="btn" type="primary" :loading="loginLoading" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      // 表单验证规则
      rules:{
        username:[
          {required:true,message:'请输入账号',trigger:'blur'}
        ],
        password:[
          {required:true,message:'请输入用户密码',trigger:'blur'}
        ],
        code:[
          {required:true,message:'请输入验证码',trigger:'blur'}
        ]
      },
      // form表单绑定的数据
      form: {
        username: "",
        password: "",
        code:""
      },
      codeImage:'',
      captchaId:'',

      // 登录按钮状态
      loginLoading:false,
      // 显示本地存储的用户名称
      showToople:false
    };
  },
  created(){
    this.captchaId = ''
    this.getByDomain()
    this.getCaptchaImage()
  },
  methods: {
    // 触发usernamefocus事件
    nameFocus(){
      this.showToople = true
    },
    // 触发usernamebuld事件
    nameBlurs(){
      this.showToople = false
    },
    // 登录按钮
    onSubmit() {
      this.$refs.form.validate((valid)=>{
        if(valid){
          let params = {
            appCode: "SUIYUE_OA",//固定参数：随约后台办公
            loginType:6,//固定参数：员工后台登录
            mobile:this.form.username,
            password:this.form.password,
            captcha:this.form.code,
            captchaId:this.captchaId,
            oemCode: sessionStorage.getItem('oemCode')
          }
           this.loginDomain(params)
        }
      })
  
    },
    // 登录接口
    loginDomain(params){
      this.loginLoading = true
      this.$post('/basic/api/base/userLogin/loginByWorkbench',params).then(res=>{
        this.loginLoading = false
        if(res.code == 200){
          this.$message({
            message:'登录成功',
            type:'success'
          })
          this.$router.push('/home')
          localStorage.setItem('loginType',JSON.stringify({username:this.form.username,password:this.form.password}))
          let loginInfo = {
            custGlobalId:res.data.custGlobalId,
            nickName:res.data.nickName,
            oemCodes:res.data.oemCodes,
            openId:res.data.openId,
            token:res.data.token,
            avatarUrl:res.data.avatarUrl
          }
          sessionStorage.setItem('avatarUrl',res.data.avatarUrl)
          sessionStorage.setItem('loginInfo',JSON.stringify(loginInfo))
          sessionStorage.setItem('token',res.data.token)
          sessionStorage.setItem('openId',res.data.openId)
          this.$store.commit('updateToken',res.data.token)
          this.$store.dispatch('saveUserInfo',loginInfo)

          return
        }else{
          this.clearCode(res.desc)
        }
      }).catch((err)=>{
        this.loginLoading = false
      })
    },
    // 登录失败之后，清除账号以及密码
    clearCode(desc){
      this.$message({
            message:desc,
            type:'error'
       })
       this.form.code = ''
       this.getCaptchaImage()
    },
    // 获取主页信息接口
    getByDomain(){
       this.$get('/basic/api/base/finger/tenantPortalConfig/getByDomain').then(res=>{
         if(res.code == 200){
           sessionStorage.setItem('oemCode',res.data.oemCode)
         }else{
           sessionStorage.setItem('oemCode','')
         }
       })
     },
    // 获取验证码图片以及验证码id接口
    getCaptchaImage(){
       this.captchaId = ''
       this.$get('/basic/api/base/captcha/captchaImage').then(res=>{
         if(res && res.data){
           this.codeImage = "data:image/gif;base64,"+res.data.img
           this.captchaId = res.data.captchaId 
         }
       })
     },
  }
};
</script>

<style lang="scss" scoped>
.login-form {
  width: 350px;
  margin: 160px auto; /* 上下间距160px，左右自动居中*/
  background-color: rgba(255, 255, 255, 0.8); /* 透明背景色 */
  padding: 30px;
  border-radius: 20px; /* 圆角 */
  .code-input{
    width: 50%;
  }
  .image{
    width: 100px;
    height: 40px;
    margin-left: 10px;
    cursor: pointer;
    user-select: none;
  }
  .btn{
    width: 260px;
  }
}

/* 背景 */
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image:linear-gradient(to right,#3DB684,#95CF4B) ;
}

/* 标题 */
.login-title {
  padding: 20px 0;
  color: #57585a;
  font-weight: bold;
  text-align: center;
}
// 隐藏的账号框
.username-div{
 
  position: relative;
  .toople-div{
    position: absolute;
    width: 270px;
    height: 400px;
    background: #ffffff;
    border-radius: 5px;
    top: 45px;
    left: 0;
    z-index:999;
    overflow-y: auto;
    &::-webkit-scrollbar{
      width: 5px;
    }
  }

}
</style> 