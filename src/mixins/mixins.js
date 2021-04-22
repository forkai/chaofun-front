 // 导出新组件
 import Cookies from 'js-cookie'

 import Vue from 'vue'
// import login from '@/components/chaofan/common/login/login.js'

// Vue.prototype.$login = login

 export default {
    props: {
      
    },
    data() {
      return {
        imgOrigin: 'https://i.chao.fun/',
        defaultUserIcon: 'f58b7f52d7c801ba0806e2125a776a44.png',
        ISPHONE: document.body.clientWidth>800&&!navigator.userAgent.includes('iPad')?false:true,
        imgMaxWidth: document.body.clientWidth - 100,
        clientWidth: document.body.clientWidth,
        clientHeight: document.body.clientHeight,
        isiOS: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        isAndroid: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1,
        scrollHeight: document.body.clientHeight - 50,
        // login: login
      };
    },
    mounted() {
      // console.log(this.ISPHONE)
      // var u = navigator.userAgent;
      // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      
      document.addEventListener('gesturestart', function(event) {
          event.preventDefault();
          console.log('gesturestart')
      });
      // console.log(document.getElementsByClassName('nav_con').clientHeight)
    },
    methods: {
      reFresh(){
        location.reload()
      },
      toUser(userInfo){
        localStorage.removeItem('storedata')
        if(userInfo){
          if(this.$route.path.includes('/user/')){
            localStorage.setItem('whichOne','pub');
          }
          window.open('/user/' +  userInfo.userId.toString(),'_blank')
          // this.$router.push({name: 'userhome',params:{id: userInfo.userId,userInfo}})
        }
      },
      toSearch(){
        if(this.$route.path == 'search'){
  
        }else{
          this.$router.push({name: 'search',query:{q:this.keyword}})
        }
      },
      doSpan(t){
        // 1024
      },
      toPosition(){
        if(this.$route.query.time){
          console.log('111',this.$('.infinite-list'))
          this.$('.infinite-list').animate({ scrollTop:  localStorage.getItem('storedata')?JSON.parse(localStorage.getItem('storedata')).top:0}, 10); 
          setTimeout(()=>{
            localStorage.removeItem('storedata')
          },1000)
        }else{
          localStorage.removeItem('storedata')
        }
      },
      doTheme(v){
        let obj = {}
        let styles = this.$store.state.settings.styles
        if(styles.bodyStyle.type == 'open'){
          obj.backgroundColor = 'transparent';
        }
        if(v == 'bodyStyle'&&styles.bodyStyle.type == 'open'){
          return Object.assign(obj, styles.bodyStyle);
        }else if(v == 'contentStyle'){
          if(styles.contentStyle.type == 'open'){
            return Object.assign({}, styles.contentStyle)
          }else{
            return Object.assign(obj)
          } 
        }else if(v == 'sidebarStyle'){
          if(styles.sidebarStyle.type == 'open'){
            return Object.assign({}, styles.sidebarStyle)
          }else{
            return Object.assign(obj)
          } 
        }else if(v == 'navbarStyle'){
          if(styles.navbarStyle.type == 'open'){
            return Object.assign({}, styles.navbarStyle)
          }else{
            return Object.assign(obj)
          }
        }
        
      },
      doLoginStatus(){ // 判断是否登录
        return new Promise((resolve,reject)=>{
          if(this.$store.state.user.islogin){
            resolve(true)
          }else{
            this.$store.dispatch('user/SET_logStatus','login')
            resolve(false)
          }
        })
      },
      toUrl(query){
        if(query.routeType == 1){
          window.open(query.url,'_blank')
        }else{
          this.$router.push(query);
        }
      },
      doSpan(){ // 主区域布局
        let winWidth = document.body.clientWidth
        if(winWidth>1200&&winWidth<1500){

        }
      },
      doOffSet(){
        let opened = Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true
        let winWidth = document.body.clientWidth
        let sideBarWidth = opened ? 240 : 54
        let contentWidth = winWidth - sideBarWidth;
        return Math.floor(((winWidth - this.doWidth() / 24.0 * contentWidth) / 2 - sideBarWidth) / (contentWidth) * 24)
      },
      doWidth(){
        let opened = Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true
        let sideBarWidth = opened ? 240 : 54
        let winWidth = document.body.clientWidth - sideBarWidth
        return Math.ceil(640.0 / winWidth  * 24)
      },
      doRightOffset() {
        return (this.doOffSet() + this.doWidth())
      }
    }
  };
  