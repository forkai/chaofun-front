<template>
 <div v-if="show" class="cover">  
    <div v-if="logStatus == 'login'" class="ycovers ">
      <div class="ycontainer">
        <img @click="cancelLogin" class="cancel" :src='cancelImg'/>
        <h1>用户登录</h1>
        <div style="">
          <input type="text" v-model="params.userName"  placeholder="用户名"/>
          <input type="password" v-model="params.password"  placeholder="密码"/>
          <!-- <input type="text" v-model="params.userName"  placeholder="手机号"/>
          <div class="code_con">
            <input class="code" type="text">
            <span>发送验证码</span>
          </div> -->
        </div>
        <div class="remPassword">
          <!-- <input  type="checkbox"/> -->
          <!-- <el-checkbox style="font-size:12px;" v-model="ifRemember">记住密码</el-checkbox> -->
          
        </div>
        <div class="ylogin" @click="logOrReg(1)">登录</div>
        <p>还未注册？ <span @click='toWhat("register")'>去注册</span></p>
      </div>
    </div>
    <div v-if="logStatus == 'register'" class="ycovers ">
      <div class="ycontainer">
        <img @click="cancelLogin" class="cancel" :src='cancelImg'/>
        <h1>快速注册</h1>
        <div>
          <input type="text" v-model="params.userName" placeholder="用户名"/>
          <input type="password" v-model="params.repassword"  placeholder="密码"/>
          <input type="password" v-model="params.password" placeholder="确认密码"/>
        </div>
        <div @click="logOrReg(2)" class="ylogin">注册</div>
        <p>已有账号？ <span @click='toWhat("login")'>去登录</span></p>
      </div>
    </div>
 </div>
</template>

<script>
import Vue from 'vue'
import * as api from '@/api/api'
import { mapState } from 'vuex'
import {deepClone,randomRange} from '@/utils'
import { Checkbox } from 'element-ui'
 export default {
   name: '',
   data(){
     return {
         cancelImg: require('@/assets/images/icon/cancel1.png'),
         show: false,
         params: {
          userName: '',
          password: ''
        },
        ifRemember: false,
        registerSuccess: true,
        logStatus: 'login'
     }
   },
   computed:{
    //  ...mapState({
    //   logStatus: state => state.user.logStatus,
    //   islogin: state => state.user.islogin,
    // }),
   },
   props: {
    //  callBack:{
    //    type: Function,
    //    default: (v)=>{
    //     //  this.$store.dispatch('user/SET_logStatus',v)
    //     console.log('aaa')
    //    }
    //  }
   },
   components: {
     'el-checkbox': Checkbox
   },
   watch:{
    logStatus(v){
      if(v=='login'){
        if(localStorage.getItem('u')){
          this.params = {
            userName: this.tils().decode(localStorage.getItem('u').split('||')[0]),
            password: this.tils().decode(localStorage.getItem('u').split('||')[1]),
          }
          this.ifRemember = true
        }
      }
      if(v){
        let that = this;
        document.onkeydown=function(event){
          console.log('123123123')
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if(e.keyCode==13&&that.logStatus){//上
                if(that.logStatus == 'login'){
                    that.logOrReg(1)
                }else if(that.logStatus == 'register'){
                    that.logOrReg(2)
                }
            }
        };
      }else{
        document.removeEventListener("keydown");
      }
    }
  },
   created() {
     if(this.callBack){
       console.log('999')
       this.callBack()
     }
   },
   mounted() {
    
   },
   methods: {
    toUrls(item,params){
       this.postBehavior(item.postId,'jump');
       this.toUrl(params)
    },
    showLogin(){
      this.show = true;
    },
    toWhat(v){
      // this.$store.dispatch('user/SET_logStatus',v)
      // this.$store.commit('user/SET_logStatus', v)
      
      this.logStatus = v;
    },
    cancelLogin(){
      // Vue.$store.dispatch('user/SET_logStatus','')
      this.logStatus = 'login'
      this.show = false;
    },
    logOrReg(v){
      let params = deepClone(this.params);

      
      if(v==1&&this.ifNull(v)){
        api.toLogin(params).then(res=>{
          if(res.success){
            if(this.ifRemember){
              let random = randomRange(40);
              let a = this.tils().encode(params.userName);
              let p = this.tils().encode(params.password);
              localStorage.setItem('u',a+'||'+p)
            }else{
              localStorage.removeItem('u')
            }
            // debugger
            this.getUserInfo()
          }else{
            this.$toast('登录失败，用户名或密码错误');
          }
          // localStorage.setItem('userInfo',JSON.stringify(res.data))
        })
      }else if(v==2&&this.ifNull(v)){
        api.toRegister(params).then(res=>{
          if(res.success){
            this.getUserInfo()
            this.registerSuccess = true
          }else{
            this.$toast(res.errorMessage);
            console.log(123)
          }
        })
      }
    },
    ifNull(v){
      let params = deepClone(this.params);
      if(v == 1){
        if(params.userName&&params.password){
          return true
        }else{
          return false
        }
      }else{
        if(params.userName&&params.password&&params.repassword){
          if(params.password == params.repassword){
            return true
          }else{
            this.$message.error('两次输入的密码不正确')
            return false
          }
          
        }else{
          return false
        }
      }
    },
    getUserInfo(){
      this.$toast('登录成功')
      this.callBack();
      // Vue.$store.dispatch('user/SET_logStatus','')
      this.logStatus = 'login'
      setTimeout(()=>{
        location.reload()
      },10)
      
    },
    tils(){
      const randStr = () => Math.random().toString(36).substr(2);
      const supplyFunc = (str, len) => {
        if(str.length > len) return str.substr(0, len);
        if(str.length < len) return supplyFunc(str + randStr(), len);
        return str;
      }
      const str10 = () => supplyFunc(randStr(), 10);
      //加密函数
      const encode = str => str10() + escape(str) + str10();
      //解密函数
      const decode = str => unescape(str.substr(10, str.length - 20));
      return {
        encode,decode
      }
    },
   }
 }
</script>

<style type='text/scss' lang='scss' scoped>
  .ycovers{
  position: fixed;
  z-index: 2012;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: space-around;
  .ycontainer{
    background: #fff;
    width: 320px;
    // height: 350px;
    box-sizing: border-box;
    padding: 30px;
    border-radius: 10px;
    position: relative;
    .cancel{
      position: absolute;
      top: 14px;
      right: 14px;
      width: 24px;
      height: 24px;
      cursor: pointer;
      z-index: 10;
    }
    h1{
      font-size: 16px;
      font-weight: 700;
      text-align: center;
      color: #e23d0e;
      margin-bottom: 10px;
    }
    input{
      height: 34px;
      outline: none;
      border: 1px solid #ededed;
      background: #f6f7f8;
      font-size: 14px;
      margin-top: 10px;
      width: 100%;
      padding-left: 10px;
    }
    .remPassword{
      line-height: 30px;
      margin-top: 14px;
      font-size: 12px;
      input[type='checkbox']{
        width: 14px;
        height: 14px;
        margin-right: 6px;
        // vertical-align: baseline;
      }
    }
    .code_con{
      display: flex;
      justify-content: space-between;
      input{
        width: 150px;
      }
      span{
        line-height: 34px;
        margin-top: 10px;
        text-align: center;
        flex: 0 0 100px;
        border: 1px solid #ddd;
        cursor: pointer;
      }
    }
    .ylogin{
      background: #e23d0e;
      color: #fff;
      text-align: center;
      line-height: 34px;
      border-radius: 10px;
      margin-top: 24px;
      margin-bottom: 24px;
      cursor: pointer;
    }
    p{
      font-size: 12px;
      text-align: center;
      span{
        color: #e23d0e;
        cursor: pointer;
      }
    }
  }
}
</style>
