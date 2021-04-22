<template>
  <div :class="classObj" class="app-wrapper" :style="doTheme('bodyStyle')">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar :style="ISPHONE?{backgroundColor: '#fff'}:doTheme('sidebarStyle')" class="sidebar-container"  />
    
    <div :class="[{hasTagsView:true||needTagsView},'main-container']">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar :islogin="islogin" :userinfo="userinfo" />
      </div>
      <app-main :style="doTheme('contentStyle')"/>
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
    <div v-if="!ISPHONE" class="beian">
      Copyright © 2019 - 2021 炒饭 <img style="width:16px" src="../assets/images/bbcc.png" alt=""> <a target="_blank" href="http://www.beian.miit.gov.cn">粤ICP备19153164号-1</a>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import BackgroundSet from '@/components/chaofan/BackgroundSet'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
import Vue from 'vue'
import login from '@/components/chaofan/common/login/login.js'
// Vue.use(login);
Vue.prototype.$login = login


console.log("探寻这里的秘密，\n找到自己的最爱，\n成为这里的主人，\n炒饭-新趣、分享、交流");
console.log("%c我们的网址是: ","color:red", "https://chao.fun");
if(process.env.NODE_ENV != "development"){
  console.log=function(text,type=''){} 
}

// 活动
import lottery from '@/components/chaofan/activity/51/lottery'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    BackgroundSet,
    lottery
    // TagsView
  },
  data(){
    return {
      // logStatus: ''
      
    }
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader,
      logStatus: state => state.user.logStatus,
      userinfo: state => state.user.userInfo,
      islogin: state => state.user.islogin,
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
  },
  mounted(){
    
  },
  methods: {
    cancelRegisterSuccess(){
      this.getUserInfo()
    },
    
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 9;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }





.pabsolute{
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  padding-top: 50px;
  .uname{
    font-size: 16px;
    span{
      color: #e23d0e;
    } 
  }
  .logo{
    margin-top: 210px;
    img{
      width: 80px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 14px;
    }
    span{
      cursor: pointer;
      &:hover{
        color: #e23d0e;
      }
    }
  }
}
/deep/ .el-checkbox__label{
  font-size: 12px;
}
.beian{
  position: fixed;
  right: 30px;
  bottom: 10px;
  z-index: 100;
  a{
    text-decoration: underline;
    &:hover{
      color: #e23d0e;
    }
  }
}
</style>
