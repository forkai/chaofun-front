<template>
 <div id="rright" class="rright">
      <div class="right_content">
      <div v-if="forumInfo" class="asa">
        <div class="forum_con">
          <div class="fir">
            <img :src="imgOrigin+forumInfo.imageName+'?x-oss-process=image/resize,h_80'" />
            <div>{{forumInfo.name}}</div>
          </div>
          <div class="forum_desc">{{forumInfo.desc}}</div>
<!--          <div v-if="forumInfo.name !== '推荐' && forumInfo.name !== '关注' " class="forum_add">-->
          <div class="forum_add">
            <el-button @click="gotoSubmit2" type="primary" block>
              发帖
            </el-button>
          </div>
        </div>
      </div>
     <div v-if="!ISPHONE && forumInfo.name !== '关注'" class="tologin">
       <div @click="reload" class="body-right">
            刷新
        </div>
        <div v-if="!islogin" @click="gotologin" class="body-right">
            马上登录
        </div>
        <div @click="toUrl({name: 'lists'})" class="body-right">
            全部板块 
            <i style="float:right;color:#999;" class="el-icon-arrow-right"></i>
        </div>
        <div @click="gotoSecret" class="body-right">
            秘密花园
            <span data-v-265cb265="" style="background: red; color: rgb(255, 255, 255); font-size: 10px; vertical-align: middle; height: 18px; line-height: 18px; padding: 0px 4px; border-radius: 4px;">new</span>
        </div>
        <div @click="gotoAddForum" class="body-right">
            添加板块(待开放)
        </div>
<!--        <div class="game">-->
<!--          <div @click="toUrl({url: '/webview/buttonGame', routeType: 1})" class="title">The Button<span class="tab">第二届愚人节有奖活动</span></div>-->
<!--          <div @click="toUrl({url: '/webview/buttonGame', routeType: 1})" class="advertise">-->
<!--            <img src="https://i.chao.fun/biz/84c0bae9c0f3a4b828a9847b736eb4b8.png?x-oss-process=image/resize,h_512" alt="">-->
<!--          </div>-->
<!--        </div>-->
        
    </div>
    </div>

<!--   暂时先隐藏二维码   -->
<!--    <div v-if="$route.path=='/'||$route.path=='/all'||$route.path=='/recommend'" class="notice">-->
<!--      <div class="img">-->
<!--        <img style="width:100%;" src="../../assets/images/erweima2.jpg" alt="">-->
<!--        <p>扫码加微信邀请入炒饭用户群，欢迎大家加入~</p>-->
<!--      </div>-->
<!--    </div>-->
 </div>
</template>

<script>
import snake from '@/components/game/snake/snake3.vue'
import * as api from '@/api/api'
 export default {
   name: '',
   data(){
     return {
       gamemodule: localStorage.getItem('gamemodule'),
       forumId: '',
       gameRank: null,
       datas: {
                    width: 260,
                    height: 200,
                    speeds: [200,150,100],
                    data: {
                            // 初始头位置
                            x: 2,
                            y: 2,
                            size: 10, //大小
                            timeout: 200, // 每隔多久刷新
                        }
                }
     }
   },
   props: {
       islogin: {
           type: Boolean,
           default: false
       },
       forumInfo: {
         type: Object,
         default: null
       }
   },
   components: {
     snake
   },
   created() {
     console.log(this.$route.params)
     this.forumId = this.$route.params.forumId
   },
   mounted() {
     this.getGameTop();
     if(new Date().getDate()==1){
       this.gamemodule = true
     }
   },
   methods: {
     gotoAddForum(){
       this.$toast('该功能还未开放，敬请期待')
     },
     getGameTop(){
       api.getGameTop({top: 10}).then(res=>{
         this.gameRank = res.data
       })
     },
     inout(v){
      if(this.$store.state.user.islogin){
        if(v==1){
          // 加入
          api.joinForum({forumId: this.forumId}).then(res=>{
            if(res.success){
              this.$message({
                message: '加入成功',
                type: 'success',
                offset: 20
              });
              this.$emit('getForumInfo')
              // this.getForumInfo()
            }
          })
        }else if(v==2){
          api.leaveForum({forumId: this.forumId}).then(res=>{
            if(res.success){
              this.$message({
                message: '退出成功',
                type: 'success',
                offset: 20
              });
              // this.getForumInfo()
              this.$emit('getForumInfo')
            }
          })
        }
      }else{
        this.showLogin('login')
      }
    },
    gotologin(){
      this.showLogin('login')
    },
    showLogin(v){
      this.$login({callBack:()=>{
        this.$store.dispatch('user/getInfo')
      }});
    },
    gotoSubmit2(){// 发帖
      console.log(this.forumInfo)
      if(this.$store.state.user.islogin){
        this.$router.push({path: '/submit',query:{id: this.forumInfo.id,name: this.forumInfo.name}})
      }else{
        this.showLogin('login')
      }
    },
    sets(name,v){
      this[name] = v;
      localStorage.removeItem(name)
    },
     reload(){
       location.reload()
     },
    gotologin(){
      this.showLogin('login')
    },
    gotoSecret(){
      this.doLoginStatus().then(res=>{
        if(res){
          this.$router.push({name: 'secret'})
        }
      })
    },
    gotoSubmit(){
      this.doLoginStatus().then(res=>{
        if(res){
          this.$router.push({name: 'submit'})
        }
      })
        
    }
   }
 }
</script>

<style type='text/scss' lang='scss' scoped>
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  padding: 0;
  width: 4px;
  height: 44px;
  // background-color: rgba(0, 0, 0, .2);
  // background-color: #f1f1f1;
  background-color: $linkcolor;
}
::-webkit-scrollbar {
  width: 4px;
  padding: 10px;
  // height: 44px;
  background-color: #999;
}
.forum_desc{
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
  margin-top: 20px;
}
.rright{
  max-height: calc(100vh - 124px);
  padding: 10px;
  // background: rgb(241,241,241);
  overflow: hidden;
  overflow-y: auto;
  .right_content{
    
  }
  .asa{
    border: 1px solid #f1f1f1;
  }
}
 .tologin{
  background: #f7f7f7;
  border: 1px solid #f1f1f1;
  border-radius: 6px;
  background: #fff;
  div.body-right{
    padding: 14px;
    border-bottom: 1px solid #f1f1f1;
    font-size: 16px;
    
    cursor: pointer;
    &:hover{
      color: $linkcolor;
    }
  }
}
.advertise{
  margin: 0px 0;
  img{
    width: 270px;
  }
}
.game{
  position: relative;
  .title{
    line-height: 34px;
    padding-left: 10px;
    .tab{
      font-size: 12px;
      background: chocolate;
      color: #fff;
      padding: 2px 4px;
      border-radius: 2px;
    }
    .close{
      background: #ddd;
      float: right;
      font-size: 12px;
      height: 24px;
      line-height: 24px;
      padding: 0 4px;
      cursor: pointer;
    }
  }
}
.rank{
  .rank_title{
    line-height: 38px;
    position: relative;
    img{
      width: 34px;
      vertical-align: middle;
    }
  }
  .rank_item{
    display: flex;
    padding: 8px 6px;
    border-bottom: 1px solid #f1f1f1;
    img{
      flex: 0 0 24px;
      width: 20px;
      height: 22px;
      vertical-align: middle;
      margin-right: 4px;
    }
    span.mci{
        width: 22px;
        height: 22px;
        display: inline-block;
        vertical-align: middle;
        background: #ccc;
        text-align: center;
        line-height: 22px;
        border-radius: 50%;
        margin-right: 8px;
    }
    .username{
      flex: 1;
      cursor: pointer;
      &:hover{
        color: $linkcolor;
      }
    }
    .score{
      flex:  0 0 60px;
      text-align: right;
    }
  }
}
.rule{
  float: right;
  color: #999;
  font-size: 13px;
  cursor: pointer;
  position: relative;
  z-index: 2;
  &:hover{
    + .rules{
      display: block;
    }
  }
}
.rules{
  border: 1px solid #ddd;
  position: absolute;
  display: none;
  z-index: 1;
  bottom: 37px;
  left: 0;
  background: #fff;
  line-height: 20px;
  font-size: 14px;
  padding: 10px;
  p{
    margin-bottom: 6px;
  }
}
.notice{
  margin: 10px 0;
  background: #fff;
  width: 270px;
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  padding: 0 10px 10px;
  border-radius: 6px;
  .notice_title{
    line-height: 40px;
    font-size: 16px;
  }
  img{
    vertical-align: middle;
    margin-right: 2px;
    width: 16px;
  }
  .notice_con{
    border: 1px solid #f1f1f1;
    padding: 14px 10px;
    cursor: pointer;
    font-size: 13px;
    line-height: 20px;
    &:hover{
      color: $linkcolor;
    }
    p{
      font-size: 12px;
      color: #999;
      padding: 2px 0 2px;
      border-bottom: 1px solid #f1f1f1;
      text-align: right;
    }
  }
}
.notice_tab{
  background: chocolate;
  color: #fff;
  padding: 2px 4px;
  border-radius: 4px;
}
</style>
